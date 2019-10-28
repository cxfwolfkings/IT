export class TreeNodeModel {
    key: string;
    title: string;
    isLeaf: boolean;
    disabled: boolean;
    children: TreeNodeModel[];
}

export class TreeModel {
    nodes: TreeNodeModel[];
    expandKeys: string[];
    checkedKeys: string[];
    selectedKeys: string[];
}
