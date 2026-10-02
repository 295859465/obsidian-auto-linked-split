import { Plugin, WorkspaceLeaf, WorkspaceParent, MarkdownView } from 'obsidian';

export default class AutoLinkedSplitPlugin extends Plugin {
	async onload() {
		console.log('AutoLinkedSplit loaded');

		// 注册命令：拆分当前面板，自动关联
		this.addCommand({
			id: 'split-and-link',
			name: '拆分当前面板并自动关联',
			callback: async () => {
				const view = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (!view) return;
                const activeLeaf = view.leaf;
                const state = activeLeaf.getViewState();
				// 垂直拆分，新建右侧leaf
				const newLeaf = this.app.workspace.createLeafBySplit(activeLeaf, 'vertical');
                await newLeaf.setViewState({...state});
				// 设置同一个group
				const groupId = `auto-linked-group-${Date.now()}-${Math.random().toString(36).slice(2)}`;
				activeLeaf.setGroup(groupId);
				newLeaf.setGroup(groupId);
			}
		});

		// 监听布局变化：自动检测左右分屏
		
	}

	onunload() {
		console.log('AutoLinkedSplit unloaded');
	}
}
