import { Plugin } from 'obsidian';

export default class PluginTemplate extends Plugin {
  override async onload() {
    console.log('loading plugin');
  }

  override async onunload() {
    console.log('unloading plugin');
  }
}
