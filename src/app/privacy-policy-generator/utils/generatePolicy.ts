import { CompanyInfoType } from '../components/CompanyInfo';

type GenerationMethod = 'quick' | 'custom';
type OptionKey = 'industry' | 'dataCollection' | 'dataUsage' | 'dataSharing' | 'userRights' | 'security' | 'specialConsiderations';

export function generatePolicy(
  method: GenerationMethod,
  quickSelections: Record<OptionKey, string[]>,
  customAnswers: Record<string, string>,
  companyInfo: CompanyInfoType,
  customIndustry: string 
): string {
  let policy = `# ${companyInfo.name}隐私政策\n\n`;

  if (method === 'quick') {
    policy += generateQuickPolicy(quickSelections, companyInfo, customIndustry);
  } else {
    policy += generateCustomPolicy(customAnswers);
  }
  return policy;
}

function generateQuickPolicy(quickSelections: Record<OptionKey, string[]>, companyInfo: CompanyInfoType, customIndustry: string): string {
  let policy = "";

  // 引言部分
  const industry = quickSelections.industry[0] === '其他' ? customIndustry : quickSelections.industry.join('、');
  policy += `## 1. 引言\n${companyInfo.name}是一家${industry}行业的公司。我们重视您的隐私，并致力于保护您的个人信息。本隐私政策（"政策"）旨在向您说明我们如何收集、使用、存储和保护您的个人信息，以及您享有的相关权利。\n\n`;
  policy += `${companyInfo.name}认识到保护您的隐私的重要性。我们感谢您对我们的信任。本政策描述了我们如何处理通过我们的应用程序（统称为"平台"）收集的用户信息。通过平台下载、使用和/或访问我们的服务，即表示您明确同意本政策中描述的信息做法。如果您不同意本政策中的任何条款，请不要使用我们的服务。\n\n`;

  // 信息收集部分
  if (quickSelections.dataCollection) {
    policy += `## 2. 信息收集\n我们收集以下类型的信息：${quickSelections.dataCollection.join('、')}。我们收集这些信息的目的是为了提供和改进我们的服务。我们承诺遵循最小必要原则，只收集实现产品功能所必需的信息。\n\n`;
    // 保留原有的必要个人信息范围和敏感个人信息的收集部分
  }

  policy += `我们还可能收集以下信息：\n\n`;
  policy += `• 联系信息：当您使用第三方媒体网站的账户登录时，我们会收集您在该第三方网站的账户信息，一般包括：账户名、电子邮件地址、电话号码和地区。\n\n`;
  policy += `• 使用信息：我们可能会收集您在平台上的操作信息，主要包括您点击、浏览、下载、分享的信息以及您的搜索记录，或您在使用我们的服务过程中提供的任何其他信息。\n\n`;
  policy += `• 设备和日志信息：当您通过平台使用我们的服务时，我们将收集您的设备和日志信息，如设备型号、操作系统、IP地址、软件版本号等。\n\n`;
  policy += `• 反馈信息：当您联系我们进行反馈或客户服务时，我们将收集您提交的信息和材料、您的联系方式。\n\n`;

  // 权限授权部分
  policy += `## 3. 授权权限\n为了向您提供更优质、高效的产品和服务，我们可能会要求您授权以下权限：\n\n`;
  policy += `• 相机权限：用于视频拍摄\n\n`;
  policy += `• 读写外部存储卡：用于读取和写入外部存储卡上的文件\n\n`;
  policy += `• 接收通知消息：用于接收消息\n\n`;
  policy += `• 获取当前网络状态：提醒用户当前网络状态\n\n`;
  policy += `• 人脸识别：对于特定的主题模板编辑和短视频制作服务\n\n`;
  policy += `您可以在终端设备的系统设置中查看上述权限的状态，并随时自行决定开启或关闭任一或全部权限。\n\n`;

  // 信息使用部分
  if (quickSelections.dataUsage) {
    policy += `## 4. 信息使用\n我们使用收集的信息用于以下目的：${quickSelections.dataUsage.join('、')}。我们承诺只将您的个人信息用于实现产品功能所必需的用途。\n\n`;
  }

  // 信息共享部分
  if (quickSelections.dataSharing) {
    policy += `## 5. 信息共享\n我们可能会与以下第三方共享您的信息：${quickSelections.dataSharing.join('、')}。我们只会在必要的情况下共享您的信息，并要求第三方对您的信息保密。对于敏感个人信息的共享，我们将单独征得您的明示同意。\n\n`;
  }

  // 用户权利部分
  if (quickSelections.userRights) {
    policy += `## 6. 您的权利\n根据适用的数据保护法律，您享有以下权利：${quickSelections.userRights.join('、')}。如果您想行使这些权利，请联系我们。您有权随时撤回您的授权同意，但这不会影响撤回前基于您的授权而开展的信息处理。\n\n`;
  }

  // 信息安全部分
  if (quickSelections.security) {
    policy += `## 7. 信息安全\n我们采取以下措施来保护您的信息：${quickSelections.security.join('、')}。尽管我们采取了这些措施，但请注意，没有任何安全系统是绝对安全的。我们建立了专门的管理制度、流程和组织以保障信息的安全。\n\n`;
  }

  // 特殊考虑部分
  if (quickSelections.specialConsiderations) {
    policy += `## 8. 特殊考虑\n我们还特别注意以下方面：\n`;
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

  // Cookies 和类似技术的使用部分
  policy += `## 9. Cookies 和类似技术的使用\n`;
  policy += `当您使用我们的服务时，我们可能会使用"cookies"或类似技术（例如 Google Analytics 和网络信标）来收集和存储信息。\n\n`;

  // 信息保留部分
  policy += `## 10. 信息保留\n`;
  policy += `我们保留个人信息的期限是为了提供我们的服务或实现收集此类信息的原始或直接相关目的，或其他商业目的，例如遵守我们的法律义务、解决纠纷、并执行我们的协议。\n\n`;

  // 政策修改部分
  policy += `## 11. 本政策的修改\n`;
  policy += `我们保留在通知或不通知的情况下随时修改本政策的权利，并将在此网页上发布任何更新。修订后的政策取代所有以前的版本。您在平台上继续使用产品和服务将被视为接受更新后的隐私政策。\n\n`;

  // 联系我们部分
  policy += `## 12. 联系我们\n如果您对本隐私政策有任何疑问，请联系我们：\n\n电子邮件：${companyInfo.contactEmail}\n网站：${companyInfo.website}`;

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