# 🚀 NPM Publishing Checklist

## Pre-Publishing Steps

### 1. Update Package Information
- [ ] Update `package.json` with your username/org name
  ```bash
  # Replace @your-username with your actual npm username
  # In package.json: "name": "@your-username/rating-component"
  ```

- [ ] Update author information in `package.json`
  ```json
  "author": "Your Name <your.email@example.com>"
  ```

- [ ] Update repository URLs in `package.json`
  ```json
  "repository": {
    "type": "git",
    "url": "https://github.com/pranavjeet123/rating-component.git"
  }
  ```

### 2. Update README.md
- [ ] Replace placeholder URLs with actual repository links
- [ ] Add your contact information
- [ ] Update installation instructions with your actual package name
- [ ] Add screenshots or GIFs if desired

### 3. Test Locally
- [ ] Run development server
  ```bash
  npm run dev
  ```
- [ ] Test all component features
- [ ] Verify responsiveness
- [ ] Test keyboard navigation
- [ ] Check browser console for errors

### 4. Build Library
- [ ] Run the library build
  ```bash
  npm run build:lib
  ```
- [ ] Verify `dist/` folder contains:
  - `rating-component.js` ✅
  - `rating-component.d.ts` ✅ (TypeScript declarations)
  - `rating-component.js.map` ✅ (Source maps)
  
- [ ] Check the generated files
  ```bash
  ls -la dist/
  cat dist/rating-component.d.ts  # Verify TypeScript declarations
  ```

### 5. Test the Built Package
- [ ] Create a test project
  ```bash
  mkdir test-package
  cd test-package
  npm init -y
  npm install ../path-to-your-component
  ```
- [ ] Create test HTML file and verify it works

## Publishing Steps

### 1. NPM Account Setup
- [ ] Create NPM account at https://www.npmjs.com/signup
- [ ] Verify your email address
- [ ] Enable 2FA (Two-Factor Authentication) - Recommended

### 2. Login to NPM
```bash
npm login
```
- [ ] Enter username
- [ ] Enter password
- [ ] Enter email
- [ ] Enter OTP (if 2FA enabled)

### 3. Version Management
Choose appropriate version bump:
```bash
# For bug fixes
npm version patch  # 1.0.0 → 1.0.1

# For new features (backward compatible)
npm version minor  # 1.0.0 → 1.1.0

# For breaking changes
npm version major  # 1.0.0 → 2.0.0
```

### 4. Publish to NPM
```bash
# For scoped packages (recommended)
npm publish --access public

# For unscoped packages
npm publish
```

### 5. Verify Publication
- [ ] Check package page: `https://www.npmjs.com/package/@your-username/rating-component`
- [ ] Verify version number
- [ ] Check if README displays correctly
- [ ] Verify keywords and description

### 6. Test Installation
```bash
# In a new directory
npm install @your-username/rating-component
```

## Post-Publishing

### 1. Create Git Tag
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### 2. Create GitHub Release (Optional)
- [ ] Go to GitHub releases page
- [ ] Create new release from tag
- [ ] Add release notes
- [ ] Attach built files if needed

### 3. Update Documentation
- [ ] Add installation badge to README
- [ ] Update CHANGELOG.md
- [ ] Document any breaking changes

### 4. Promote Your Package
- [ ] Share on Twitter/LinkedIn
- [ ] Post on relevant Reddit communities
- [ ] Add to awesome lists
- [ ] Write a blog post

## Troubleshooting

### Common Issues

**"Package already exists"**
```bash
# Choose a different name or scope
# Update package.json name field
```

**"You must sign in to publish"**
```bash
npm login
# Then try publishing again
```

**"This package has been marked as private"**
```bash
# Remove "private": true from package.json
```

**"402 Payment Required"**
```bash
# For scoped packages, use:
npm publish --access public
```

## Updating Your Package

### For Bug Fixes
```bash
# 1. Make your fixes
# 2. Update version
npm version patch

# 3. Build
npm run build:lib

# 4. Publish
npm publish
```

### For New Features
```bash
npm version minor
npm run build:lib
npm publish
```

### For Breaking Changes
```bash
npm version major
npm run build:lib
npm publish
```

## Quick Command Reference

```bash
# Check current version
npm version

# View package info
npm view @your-username/rating-component

# Unpublish (within 72 hours)
npm unpublish @your-username/rating-component@1.0.0

# Deprecate a version
npm deprecate @your-username/rating-component@1.0.0 "Use version 1.0.1 instead"

# Check who's logged in
npm whoami

# Logout
npm logout
```

## Security Best Practices

- ✅ Enable 2FA on your NPM account
- ✅ Use scoped packages (@username/package)
- ✅ Review package contents before publishing
- ✅ Don't include sensitive data (.env files, keys)
- ✅ Use .npmignore to exclude unnecessary files
- ✅ Keep dependencies updated
- ✅ Use `npm audit` to check for vulnerabilities

## Interview Demo Steps

### Quick Demo (5 minutes)

1. **Show the built package:**
   ```bash
   npm run build:lib
   ls -la dist/
   ```

2. **Show package.json configuration:**
   - Point out "main", "module", "types" fields
   - Explain "exports" field
   - Show "files" array

3. **Demonstrate publishing (dry-run):**
   ```bash
   npm publish --dry-run
   ```
   This shows what would be published without actually publishing

4. **Explain the process:**
   > "In production, I would run `npm publish --access public` which would:
   > 1. Build the library
   > 2. Upload to NPM registry
   > 3. Make it available for installation
   > 4. Generate package page with README"

5. **Show installation:**
   ```bash
   npm install @your-username/rating-component
   ```

## Additional Resources

- [NPM Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [Publishing Web Components](https://lit.dev/docs/tools/publishing/)
- [NPM Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

---

**Note:** Replace `@your-username` with your actual NPM username throughout this guide.

Good luck with your interview! 🎉
