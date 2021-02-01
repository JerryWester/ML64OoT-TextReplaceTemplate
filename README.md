# OoT Text Replacement Template
## Usage
When you have your message files, drop them in the `TextReplacementTemplate` folder, next to `package.json`. Edit `package.json` to point to the specified files, and change `"core"` to refer to the specific game with text being replaced. `package.json` should look something like this:
```json
{
  "core": "OcarinaofTime",
  "EN_message": "1_message_data_static.bin",
  "JP_message": ""
}
```
You can leave either message field empty if you don't need to replace them. Majora's Mask not currently supported.

## Getting Text Files
### For [Zelda's Letter](https://deku.link/z64-text-editor/)
In Zelda's Letter, press Ctrl+P, and select "Application: Save Binaries". `1_message_data_static.bin` is English text, `0_message_data_static.bin` is Japanese text.
