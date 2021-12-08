# Changed Filenames GitHub Action

This action returns all changed files in a pull request. The changed files includes added, modified, renamed, and removed files.

- 🦄 It is actively maintained
- 💅 Minimalistic implementation
- 🌈 PRs and discussion are welcomed

### Inputs

| Parameters    | Description      | Optional | Default                |
| ------ | ---------------- | -------- | ---------------------- |
| token  | GitHub API Token | ✔        | `secrets.GITHUB_TOKEN` |
| output | Output format    | ✔        | `string`               |

#### Examples

**Using The Default Parameters**

The following usage will use the default GitHub token and return changed filenames in string format.

```yaml
- uses: DawChihLiou/changed-files-action@v1
```

The output will look like this:

```bash
.github/workflows/ci.yaml src/index.js README.md
```

**Using Custom Parameters**

The following usage will use a custom GitHub toek and return changed filenames in JSON.

```yaml
- uses: DawChihLiou/changed-files-action@v1
  with:
    token: ${{ secrets.YOUR_GITHUB_TOKEN }}
    output: 'json'
```

The output will look like this:

```bash
[".github/workflows/ci.yaml", "src/index.js", "README.md"]
```

### Using the Action

```yaml
- uses: DawChihLiou/changed-files@v1
  id: changed-files
  with:
    token: ${{ secrets.YOUR_GITHUB_TOKEN }}
    output: 'string'
- name: Echo files
  run: |
    echo "${{ steps.changed-files.outputs.filenames }}"
```
