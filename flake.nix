{
	description = "winvoice-server dev env / packaging";

	inputs = {
		nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
	};

	outputs = inputs @ { self, nixpkgs, ... }:
	let
		inherit (nixpkgs) lib;
		inherit (self) outputs;

		name = "winvoice-gui";
		version = "0.2.0";

		genSystems = lib.genAttrs ["aarch64-darwin" "aarch64-linux" "i686-linux" "x86_64-darwin" "x86_64-linux"];
		mkPkgs = system: import nixpkgs {
			inherit system;
			config.allowUnfree = true;
			overlays = [ ];
		};

		nodeJs = builtins.getAttr "nodejs_21";
	in {
		devShells = genSystems (system:
		let pkgs = mkPkgs system;
		in {
			default = pkgs.mkShell {
				inherit name;

				packages = [(nodeJs pkgs)] ++ (with pkgs; [
					# test
					mkcert

					# deploy
					kind kubectl kubectl-cnpg kubectx
					terraform
				]);
			};
		});

		packages = genSystems (system:
		let
			inherit (lib) fileset;

			pkgs = mkPkgs system;
			inherit (pkgs) importNpmLock;

			mkFileset = fileset: lib.fileset.toSource {
				inherit fileset;
				root = ./.;
			};

			nodejs = nodeJs pkgs;
			packageJson = fileset.unions [ ./package-lock.json ./package.json ];
			meta = {
				description = "A web UI for Winvoice";
				homepage = "https://github.com/Iron-E/winvoice-gui";
				license = with lib.licenses; [gpl3Plus];
				mainProgram = "winvoice-gui";
			};

			# see nixos.org/manual/nixpkgs/unstable#javascript-buildNpmPackage
			winvoice-gui-unwrapped = pkgs.buildNpmPackage {
				inherit version;
				pname = "${name}-unwrapped";

				# env vars
				NEXT_TELEMETRY_DISABLED = 1;
				NODE_ENV = "production";

				# source

				inherit nodejs;
				npmConfigHook = importNpmLock.npmConfigHook;
				npmDeps = importNpmLock {
					npmRoot = mkFileset packageJson;
				};

				src = mkFileset (fileset.unions [
					./jest.config.json
					./next-env.d.ts
					./next.config.js
					./postcss.config.js
					./src
					./tailwind.config.js
					./tests
					./tsconfig-base.json
					./tsconfig.json
					packageJson
				]);

				postInstall = /* bash */ ''
					# install locations
					targetBin="$out/bin/${name}"
					targetLib="$out/lib/node_modules/${name}"
					tmpLib="$${targetLib}-2"

					# grab next standalone files
					cp -r "$targetLib/.next/standalone" "$tmpLib"
					mkdir -p "$tmpLib/.next"
					cp -r "$targetLib/.next/static" "$tmpLib/.next/static"

					# move next standalone files into target location
					rm -r "$targetLib"
					mv "$tmpLib" "$targetLib"
				'';

				meta = {
					inherit (meta) homepage license;
					description = "${meta.description} (unwrapped)";
				};
			};

			winvoice-gui = pkgs.writeShellApplication {
				inherit meta name;

				derivationArgs = { inherit version; };
				runtimeEnv.NODE_ENV = "production";
				runtimeInputs = [ nodejs ];

				text = /* sh */ ''node "${lib.getLib winvoice-gui-unwrapped}/lib/node_modules/${name}/server.js"'';
			};
		in {
			inherit winvoice-gui winvoice-gui-unwrapped;
			default = winvoice-gui;
		});

		overlays = { };
	};
}
