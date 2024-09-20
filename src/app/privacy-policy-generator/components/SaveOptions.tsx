import React, { useState } from 'react';

const SaveOptions: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleEmailSend = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现发送邮件的逻辑
    console.log('发送邮件到:', email);
  };

  const handleDownload = () => {
    // TODO: 实现下载文件的逻辑
    console.log('下载文件');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">保存选项</h2>
      <form onSubmit={handleEmailSend} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-2">发送到邮箱:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
          发送
        </button>
      </form>
      <div>
        <button
          onClick={handleDownload}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          下载文件
        </button>
      </div>
    </div>
  );
};

export default SaveOptions;