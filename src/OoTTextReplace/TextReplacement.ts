import { EventHandler } from 'modloader64_api/EventHandler';
import { IModLoaderAPI, IPlugin, ModLoaderEvents } from 'modloader64_api/IModLoaderAPI';
import { Z64LibSupportedGames } from 'Z64Lib/API/Z64LibSupportedGames';
import { Z64RomTools } from 'Z64Lib/API/Z64RomTools';
import fs from 'fs';
import path from 'path';

class TextReplacement implements IPlugin {

    ModLoader!: IModLoaderAPI;

    preinit() {}
    init() {}
    postinit() {}
    onTick() {}

    @EventHandler(ModLoaderEvents.ON_ROM_PATCHED)
    onRomPatched(evt: any) {
        let rom = evt.rom as Buffer;
        let tools = new Z64RomTools(this.ModLoader, Z64LibSupportedGames.OCARINA_OF_TIME);
        if (!!((this as any)['metadata']['message_table'] as string)) {
            let file = fs.readFileSync(path.resolve(__dirname, (this as any)['metadata']['message_table'] as string));
            let code = tools.decompressDMAFileFromRom(rom, 27);
            file.copy(code, 0xF98AC, 0x0, 0x8354);
            let recompressed = tools.recompressDMAFileIntoRom(rom, 27, code);
            if (recompressed){
                this.ModLoader.logger.info("Successfully replaced code");
            } else {
                this.ModLoader.logger.debug("If your game crashes here, Z64Lib is outdated. Enable OotOnline and place it above this mod if necessary.");
                tools.noCRC(rom);
                let address = tools.relocateFileToExtendedRom(rom, 27, code);
                this.ModLoader.logger.info(`Failed to replace code, relocating to 0x${address.toString(16).toUpperCase()}`);
            }
        }
        if (!!((this as any)['metadata']['EN_message'] as string)) {
            let file = fs.readFileSync(path.resolve(__dirname, (this as any)['metadata']['EN_message'] as string));
            if (file.length < 0x38130 && tools.recompressDMAFileIntoRom(rom, 22, file)){
                this.ModLoader.logger.info("Successfully replaced nes_message_data_static");
            } else {
                tools.noCRC(rom);
                let address = tools.relocateFileToExtendedRom(rom, 22, file, file.length, true);
                this.ModLoader.logger.info(`Failed to replace nes_message_data_static, relocating to 0x${address.toString(16).toUpperCase()}`);
            }
        }
        if (!!((this as any)['metadata']['JP_message'] as string)) {
            let file = fs.readFileSync(path.resolve(__dirname, (this as any)['metadata']['JP_message'] as string));
            if (file.length < 0x3A350 && tools.recompressDMAFileIntoRom(rom, 19, file)){
                this.ModLoader.logger.info("Successfully replaced jpn_message_data_static");
            } else {
                tools.noCRC(rom);
                let address = tools.relocateFileToExtendedRom(rom, 19, file, file.length, true);
                this.ModLoader.logger.info(`Failed to replace jpn_message_data_static, relocating to 0x${address.toString(16).toUpperCase()}`);
            }
        }
    }

}

module.exports = TextReplacement;