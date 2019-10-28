/**
 * 规则模型
 * add by Colin
 */
export class RuleModel {
    ID: number;
    Column: string;
    Condition: string;
    Value: string[];
    Sort: number;
}

export class DynamicGroupRules {
    GroupID: number;
    optionRules: RuleModel[];
}
