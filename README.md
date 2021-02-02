# OoT Text Replacement Template
## Usage
#### This template and all mods created from it require OotOnline to be enabled and placed above the mod.
When you have your message files, drop them in the `OoTTextReplace` folder, next to `package.json`. Edit `package.json` to point to the specified files. `package.json` should look something like this:
```json
{
  "core": "OcarinaofTime",
  "EN_message": "1_message_data_static.bin",
  "JP_message": "",
  "message_table": "table.bin"
}
```
You can leave either message field empty if you don't need to replace them. Majora's Mask not currently supported.

## Getting Text Files
### For [Zelda's Letter](https://deku.link/z64-text-editor/)
In Zelda's Letter, press Ctrl+P, and select "Application: Save Binaries". `1_message_data_static.bin` is English text, `0_message_data_static.bin` is Japanese text, and `table.bin` is the message table.
#### (NOTE: Zelda's Letter only works with decompressed ROMs. You can use [zzdec](http://www.z64.me/tools/zzdec) to decompress your ROM)
