'use client'

import React, { useState, useEffect } from 'react';

interface SavedAddress {
  note: string;
  name: string;
  gender: string;
  phone: string;
  address: string;
}

export default function RandomAddressGenerator() {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('US');
  const [isLoading, setIsLoading] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [copiedField, setCopiedField] = useState('');

  useEffect(() => {
    generateAddress();
    const saved = localStorage.getItem('savedAddresses');
    if (saved) {
      setSavedAddresses(JSON.parse(saved));
    }
  }, [country]);

  const generateAddress = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(window.location.href);
      if (!response.ok) {
        throw new Error('网络响应不正常');
      }
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      
      setAddress(doc.querySelector('.address')?.textContent?.split(': ')[1] || '');
      setName(doc.querySelector('.name')?.textContent || '');
      setGender(doc.querySelector('.gender')?.textContent?.split(': ')[1] || '');
      setPhone(doc.querySelector('.phone')?.textContent?.split(': ')[1] || '');
    } catch (error) {
      console.error('获取地址时出错:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const saveAddress = () => {
    const note = prompt('请输入备注（可以留空）') || '';
    const newAddress: SavedAddress = { note, name, gender, phone, address };
    const updatedAddresses = [...savedAddresses, newAddress];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
  };

  const deleteAddress = (index: number) => {
    const updatedAddresses = savedAddresses.filter((_, i) => i !== index);
    setSavedAddresses(updatedAddresses);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">真实地址生成器</h1>
        <p className="text-center mb-8">点击即可复制信息</p>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-8 relative">
          <div id="copied" className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded hidden">
            已复制！
          </div>
          <div className="mb-6">
            <label htmlFor="country" className="block mb-2">选择国家：</label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 border rounded"
              dangerouslySetInnerHTML={{ __html: getCountryOptions(country) }}
            />
          </div>
          <div className="mb-4 cursor-pointer text-lg" onClick={() => copyToClipboard(name, 'name')}>
            <strong>姓名：</strong> {name} {copiedField === 'name' && <span className="text-green-500 ml-2">已复制</span>}
          </div>
          <div className="mb-4 cursor-pointer text-lg" onClick={() => copyToClipboard(gender, 'gender')}>
            <strong>性别：</strong> {gender} {copiedField === 'gender' && <span className="text-green-500 ml-2">已复制</span>}
          </div>
          <div className="mb-4 cursor-pointer text-lg" onClick={() => copyToClipboard(phone.replace(/[()\s-]/g, ''), 'phone')}>
            <strong>电话：</strong> {phone} {copiedField === 'phone' && <span className="text-green-500 ml-2">已复制</span>}
          </div>
          <div className="mb-4 cursor-pointer text-lg" onClick={() => copyToClipboard(address, 'address')}>
            <strong>地址：</strong> {address} {copiedField === 'address' && <span className="text-green-500 ml-2">已复制</span>}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={generateAddress}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? '生成中...' : '获取新地址'}
            </button>
            <button
              onClick={saveAddress}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              保存地址
            </button>
          </div>
          <iframe className="w-full h-96 mt-8 border-0" src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}></iframe>
        </div>

        {savedAddresses.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-8 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">已保存的地址</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">操作</th>
                  <th className="border p-2">备注</th>
                  <th className="border p-2">姓名</th>
                  <th className="border p-2">性别</th>
                  <th className="border p-2">电话号码</th>
                  <th className="border p-2">地址</th>
                </tr>
              </thead>
              <tbody>
                {savedAddresses.map((saved, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      <button
                        onClick={() => deleteAddress(index)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        删除
                      </button>
                    </td>
                    <td className="border p-2">{saved.note}</td>
                    <td className="border p-2">{saved.name}</td>
                    <td className="border p-2">{saved.gender}</td>
                    <td className="border p-2">{saved.phone}</td>
                    <td className="border p-2">{saved.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <footer className="mt-20 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm font-light tracking-wide">
            by <span className="font-medium text-gray-800 dark:text-gray-200">Odyssey76</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

function getCountryOptions(selectedCountry: string) {
  const countries = [
    { name: "美国", code: "US" },
    { name: "英国", code: "UK" },
    { name: "法国", code: "FR" },
    { name: "德国", code: "DE" },
    { name: "中国", code: "CN" },
    { name: "中国台湾", code: "TW" },
    { name: "中国香港", code: "HK" }, 
    { name: "日本", code: "JP" },
    { name: "印度", code: "IN" },
    { name: "澳大利亚", code: "AU" },
    { name: "巴西", code: "BR" },
    { name: "加拿大", code: "CA" },
    { name: "俄罗斯", code: "RU" },
    { name: "南非", code: "ZA" },
    { name: "墨西哥", code: "MX" },
    { name: "韩国", code: "KR" },
    { name: "意大利", code: "IT" },
    { name: "西班牙", code: "ES" },
    { name: "土耳其", code: "TR" },
    { name: "沙特阿拉伯", code: "SA" },
    { name: "阿根廷", code: "AR" },
    { name: "埃及", code: "EG" },
    { name: "尼日利亚", code: "NG" },
    { name: "印度尼西亚", code: "ID" }
  ];
  return countries.map(({ name, code }) => `<option value="${code}" ${code === selectedCountry ? 'selected' : ''}>${name}</option>`).join('');
}
