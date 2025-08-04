# Nimbus Scripts

## Release Candidate Publisher (`publish-rc.js`)

A local script to simplify publishing Release Candidates for Nimbus packages.

### Usage

```bash
yarn publish:rc <packageName> [version] [options]
```

### Parameters

- **`packageName`** (required, 1st argument): Name of the package to publish
  - Must be a valid `@nimbus-ds/*` package name
- **`version`** (optional, 2nd argument): Version to publish
  - If not provided, the script will use yarn version files to determine bump type
  - Can be a base version (e.g., `1.3.0`) - script will find next available RC slot
  - Can be a complete RC version (e.g., `1.3.0-rc.2`) - script will publish exactly that version

### Examples

```bash
# Publish RC for specific package (auto-detect version from yarn version files)
yarn publish:rc @nimbus-ds/button

# Publish specific version as RC (finds next available RC slot)
yarn publish:rc @nimbus-ds/button 1.3.0
# Results in: 1.3.0-rc.1 (or higher if RC.1 exists)

# Publish exact RC version
yarn publish:rc @nimbus-ds/button 1.3.0-rc.5

# Skip build process
yarn publish:rc @nimbus-ds/button --skip-build

# Publish with 2FA OTP
yarn publish:rc @nimbus-ds/button --otp=123456
```

### How It Works

1. **Package Detection**:

   - Searches workspace for the specified package name
   - Looks in common package directories (atomic, composite, core, etc.)

2. **Version Calculation**:

   - If complete RC version provided (e.g., `1.3.0-rc.2`): uses exactly that version
   - If base version provided (e.g., `1.3.0`): checks npm registry for existing RCs and finds next available slot
   - If no version provided: reads yarn version files to determine bump type (patch/minor/major), calculates next version, then finds next RC slot

3. **Safe Publishing**:
   - Builds the package first
   - Temporarily updates `package.json` version
   - Publishes to npm with `--tag rc`
   - Restores original `package.json` version
   - Handles interruptions gracefully (Ctrl+C)

### Version Bump Detection

The script automatically detects version bumps from `.yarn/versions/` files:

- Looks for files containing the package name
- Searches for keywords: `major`, `minor`, `patch`
- Defaults to the current version, plus the next available RC slot if no version files found

### Requirements

- Must be run from within the Nimbus workspace
- Requires npm authentication for publishing
- Package must have a valid build script or be buildable via workspace commands

### Troubleshooting

**"Package name is required"**

- You must specify the package name as the first argument
- Use the full package name with `@nimbus-ds/` prefix

**"Package not found in workspace"**

- Check the exact package name (use `@nimbus-ds/` prefix)
- Verify the package exists in the workspace
- Make sure you're using the correct package name from the monorepo

**"Build failed"**

- Check if the package has a valid `build` script
- Try running the build manually first

**"npm publish failed"**

- Verify you're logged into npm (`npm whoami`)
- Check your npm permissions for the package
- Ensure 2FA codes are entered correctly

**"Version already exists"**

- The script should automatically find the next available RC slot
- If this persists, manually specify a higher RC number

### Related Commands

- `yarn publish:next` - Publish pre-release versions (workspace-wide)
- `yarn publish:stable` - Publish stable versions (workspace-wide)
- `yarn bump:check` - Check version requirements
- `yarn build` - Build all packages
