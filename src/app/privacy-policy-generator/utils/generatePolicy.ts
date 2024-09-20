type GenerationMethod = 'quick' | 'custom';
type OptionKey = 'industry' | 'dataCollection' | 'dataUsage' | 'dataSharing' | 'userRights' | 'security' | 'specialConsiderations';

export function generatePolicy(
  method: GenerationMethod,
  quickSelections: Record<OptionKey, string[]>,
  customAnswers: Record<string, string>
): string {
  let policy = "# 隐私政策\n\n";

  if (method === 'quick') {
    policy += generateQuickPolicy(quickSelections);
  } else {
    policy += generateCustomPolicy(customAnswers);
  }

  policy += "\n\n## 本隐私政策的变更\n我们可能会不时更新本隐私政策。我们会通过在本页面上发布新的隐私政策来通知您任何变更。建议您定期查看本隐私政策以了解任何变更。\n\n## 联系我们\n如果您对本隐私政策有任何疑问，请联系我们：[您的联系方式]";

  return policy;
}

function generateQuickPolicy(quickSelections: Record<OptionKey, string[]>): string {
  let policy = "";

  if (quickSelections.industry) {
    policy += `## 1. 引言\n我们是一家${quickSelections.industry.join('、')}行业的公司。我们重视您的隐私，并致力于保护您的个人信息。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息，以及您享有的相关权利。\n\n`;
  }

  if (quickSelections.dataCollection) {
    policy += `## 2. 信息收集\n我们收集以下类型的信息：${quickSelections.dataCollection.join('、')}。我们收集这些信息的目的是为了提供和改进我们的服务。\n\n`;
  }

  if (quickSelections.dataUsage) {
    policy += `## 3. 信息使用\n我们使用收集的信息用于以下目的：${quickSelections.dataUsage.join('、')}。\n\n`;
  }

  if (quickSelections.dataSharing) {
    policy += `## 4. 信息共享\n我们可能会与以下第三方共享您的信息：${quickSelections.dataSharing.join('、')}。我们只会在必要的情况下共享您的信息，并要求第三方对您的信息保密。\n\n`;
  }

  if (quickSelections.userRights) {
    policy += `## 5. 您的权利\n根据适用的数据保护法律，您享有以下权利：${quickSelections.userRights.join('、')}。如果您想行使这些权利，请联系我们。\n\n`;
  }

  if (quickSelections.security) {
    policy += `## 6. 信息安全\n我们采取以下措施来保护您的信息：${quickSelections.security.join('、')}。尽管我们采取了这些措施，但请注意，没有任何安全系统是绝对安全的。\n\n`;
  }

  if (quickSelections.specialConsiderations) {
    policy += `## 7. 特殊考虑\n我们还特别注意以下方面：${quickSelections.specialConsiderations.join('、')}。\n\n`;
  }

  return policy;
}

function generateCustomPolicy(customAnswers: Record<string, string>): string {
  let policy = "";

  if (customAnswers.dataCollection) {
    policy += `## 1. 信息收集\n${customAnswers.dataCollection}\n\n`;
  }

  if (customAnswers.dataUsage) {
    policy += `## 2. 信息使用\n${customAnswers.dataUsage}\n\n`;
  }

  if (customAnswers.dataSharing) {
    policy += `## 3. 信息共享\n${customAnswers.dataSharing}\n\n`;
  }

  if (customAnswers.dataStorage) {
    policy += `## 4. 信息存储和安全\n${customAnswers.dataStorage}\n\n`;
  }

  if (customAnswers.userRights) {
    policy += `## 5. 您的权利\n${customAnswers.userRights}\n\n`;
  }

  if (customAnswers.childrenPrivacy) {
    policy += `## 6. 儿童隐私\n${customAnswers.childrenPrivacy}\n\n`;
  }

  if (customAnswers.policyUpdates) {
    policy += `## 7. 隐私政策更新\n${customAnswers.policyUpdates}\n\n`;
  }

  if (customAnswers.contactInfo) {
    policy += `## 8. 联系我们\n${customAnswers.contactInfo}\n\n`;
  }

  if (customAnswers.legalCompliance) {
    policy += `## 9. 法律合规\n${customAnswers.legalCompliance}\n\n`;
  }

  if (customAnswers.industrySpecific) {
    policy += `## 10. 行业特定要求\n${customAnswers.industrySpecific}\n\n`;
  }

  if (customAnswers.technicalDetails) {
    policy += `## 11. 技术细节\n${customAnswers.technicalDetails}\n\n`;
  }

  if (customAnswers.consentManagement) {
    policy += `## 12. 同意管理\n${customAnswers.consentManagement}\n\n`;
  }

  return policy;
}