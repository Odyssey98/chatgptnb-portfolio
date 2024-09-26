import { CompanyInfoType } from '../components/CompanyInfo';

type GenerationMethod = 'quick' | 'custom';
type OptionKey = 'industry' | 'dataCollection' | 'dataUsage' | 'dataSharing' | 'userRights' | 'security' | 'specialConsiderations';

export function generatePolicy(
  method: GenerationMethod,
  quickSelections: Record<OptionKey, string[]>,
  customAnswers: Record<string, string>,
  companyInfo: CompanyInfoType
): string {
  let policy = `# ${companyInfo.name}隐私政策\n\n`;

  if (method === 'quick') {
    policy += generateQuickPolicy(quickSelections, companyInfo);
  } else {
    policy += generateCustomPolicy(customAnswers);
  }

  policy += `\n\n## 本隐私政策的变更\n我们可能会不时更新本隐私政策。我们会通过在本页面上发布新的隐私政策来通知您任何变更。建议您定期查看本隐私政策以了解任何变更。\n\n## 联系我们\n如果您对本隐私政策有任何疑问，请联系我们：\n\n电子邮件：${companyInfo.contactEmail}\n网站：${companyInfo.website}`;

  return policy;
}

function generateQuickPolicy(quickSelections: Record<OptionKey, string[]>, companyInfo: CompanyInfoType): string {
  let policy = "";

  if (quickSelections.industry) {
    policy += `## 1. 引言\n${companyInfo.name}是一家${quickSelections.industry.join('、')}行业的公司。我们重视您的隐私，并致力于保护您的个人信息。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息，以及您享有的相关权利。\n\n`;
  }

  if (quickSelections.dataCollection) {
    policy += `## 2. 信息收集\n我们收集以下类型的信息：${quickSelections.dataCollection.join('、')}。我们收集这些信息的目的是为了提供和改进我们的服务。我们承诺遵循最小必要原则，只收集实现产品功能所必需的信息。\n\n### 2.1 必要个人信息范围\n根据国家相关法规和行业特性，我们可能需要收集以下必要个人信息：\n`;
  
    if (quickSelections.industry.includes('电子商务')) {
      policy += "• 注册用户移动电话号码\n• 收货人姓名(名称)、地址、联系电话\n• 支付时间、支付金额、支付渠道等支付信息\n";
    }
  
    if (quickSelections.industry.includes('金融服务')) {
      policy += "• 姓名、身份证号码、银行卡号\n• 联系方式（手机号码、住址）\n• 交易记录、账户余额\n• 风险评估所需的财务信息\n";
    }
  
    if (quickSelections.industry.includes('医疗健康')) {
      policy += "• 姓名、身份证号码、医保卡号\n• 病历信息、诊断结果、处方信息\n• 健康状况、生理特征数据\n";
    }
  
    if (quickSelections.industry.includes('教育')) {
      policy += "• 学生姓名、身份证号码、学号\n• 家长或监护人联系方式\n• 学习记录、成绩信息\n";
    }
  
    if (quickSelections.industry.includes('社交媒体')) {
      policy += "• 用户名、头像\n• 联系方式（如电子邮件地址、手机号码）\n• 好友列表、互动记录\n• 发布的内容和评论\n";
    }
  
    if (quickSelections.industry.includes('其他')) {
      policy += "• 根据具体服务需求收集必要的个人信息\n";
    }
  
    policy += "\n如果您拒绝提供上述必要信息，可能无法使用我们的核心服务。我们会在收集信息时明确标识必要信息和可选信息，您可以自主决定是否提供可选信息。\n\n";
  
    policy += "### 2.2 敏感个人信息的收集\n对于敏感个人信息（如身份证号码、银行卡号、生物识别信息等），我们会在收集时明确告知您收集的目的、方式和范围，并征得您的明示同意。如果您不提供这些敏感信息，不会影响您使用我们产品或服务的基本功能。\n\n";
  }

  if (quickSelections.dataUsage) {
    policy += `## 3. 信息使用\n我们使用收集的信息用于以下目的：${quickSelections.dataUsage.join('、')}。我们承诺只将您的个人信息用于实现产品功能所必需的用途。\n\n`;
  }

  if (quickSelections.dataSharing) {
    policy += `## 4. 信息共享\n我们可能会与以下第三方共享您的信息：${quickSelections.dataSharing.join('、')}。我们只会在必要的情况下共享您的信息，并要求第三方对您的信息保密。对于敏感个人信息的共享，我们将单独征得您的明示同意。\n\n`;
  }

  if (quickSelections.userRights) {
    policy += `## 5. 您的权利\n根据适用的数据保护法律，您享有以下权利：${quickSelections.userRights.join('、')}。如果您想行使这些权利，请联系我们。您有权随时撤回您的授权同意，但这不会影响撤回前基于您的授权而开展的信息处理。\n\n`;
  }

  if (quickSelections.security) {
    policy += `## 6. 信息安全\n我们采取以下措施来保护您的信息：${quickSelections.security.join('、')}。尽管我们采取了这些措施，但请注意，没有任何安全系统是绝对安全的。我们建立了专门的管理制度、流程和组织以保障信息的安全。\n\n`;
  }

  if (quickSelections.specialConsiderations) {
    policy += `## 7. 特殊考虑\n我们还特别注意以下方面：\n`;
    quickSelections.specialConsiderations.forEach(item => {
      policy += `• ${item}\n`;
      if (item === '儿童隐私') {
        policy += "我们的产品、网站和服务主要面向成人。如果没有父母或监护人的同意，儿童不得创建自己的用户账户。对于经父母同意而收集儿童个人信息的情况，我们只会在受到法律允许、父母或监护人明确同意或者保护儿童所必要的情况下使用或公开披露此信息。\n";
      } else if (item === '敏感信息特殊说明') {
        policy += "对于身份证号、银行卡号等敏感个人信息，我们会在收集时给予您明确提示，并征得您的明示同意。您有权拒绝提供，但可能会影响某些功能的正常使用。\n";
      }
    });
    policy += "\n";
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