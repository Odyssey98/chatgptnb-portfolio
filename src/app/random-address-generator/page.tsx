'use client'

import React, { useState, useEffect } from 'react';

interface SavedAddress {
  note: string;
  name: string;
  gender: string;
  phone: string;
  address: string;
  isTaxFree: boolean;
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
  const [mapUrl, setMapUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [isTaxFree, setIsTaxFree] = useState(false);

  useEffect(() => {
    generateAddress();
    const saved = localStorage.getItem('savedAddresses');
    if (saved) {
      setSavedAddresses(JSON.parse(saved));
    }
  }, [country]);

  // 使用安全的地址生成函数
  const generateAddress = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate address');
      }
      
      const data = await response.json();
      setAddress(data.address);
      setName(data.name);
      setGender(data.gender);
      setPhone(data.phone);
      setIsTaxFree(data.isTaxFree);
      
      // 使用 Google Maps Static API 替代 iframe
      const encodedAddress = encodeURIComponent(data.address);
      setMapUrl(`https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=13&size=600x400&key=YOUR_API_KEY`);
    } catch (error) {
      console.error('Error generating address:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000); // 2秒后清除复制状态
    }).catch(err => {
      console.error('复制失败:', err);
      alert('复制失败，请手动复制');
    });
  };

  const openSaveModal = () => {
    setIsModalOpen(true);
    setNoteInput('');
  };

  const saveAddress = () => {
    const newAddress: SavedAddress = { note: noteInput, name, gender, phone, address, isTaxFree };
    const updatedAddresses = [...savedAddresses, newAddress];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    setIsModalOpen(false);
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
          <div className="mb-6">
            <label htmlFor="country" className="block mb-2">选择国家：</label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              {getCountryOptions(country)}
            </select>
          </div>
          
          <div className="grid gap-4 mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                 onClick={() => copyToClipboard(name, 'name')}>
              <strong>姓名：</strong> {name}
              {copiedField === 'name' && <span className="text-green-500 ml-2">已复制</span>}
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                 onClick={() => copyToClipboard(gender, 'gender')}>
              <strong>性别：</strong> {gender}
              {copiedField === 'gender' && <span className="text-green-500 ml-2">已复制</span>}
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                 onClick={() => copyToClipboard(phone.replace(/[()\s-]/g, ''), 'phone')}>
              <strong>电话：</strong> {phone}
              {copiedField === 'phone' && <span className="text-green-500 ml-2">已复制</span>}
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                 onClick={() => copyToClipboard(address, 'address')}>
              <strong>地址：</strong> {address}
              {copiedField === 'address' && <span className="text-green-500 ml-2">已复制</span>}
              {isTaxFree && <span className="bg-yellow-500 text-black px-2 py-1 rounded ml-2 text-sm font-bold">免税区</span>}
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={generateAddress}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              disabled={isLoading}
            >
              {isLoading ? '生成中...' : '获取新地址'}
            </button>
            <button
              onClick={openSaveModal}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              保存地址
            </button>
          </div>

          {mapUrl && (
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <img 
                src={mapUrl} 
                alt="Location Map" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {savedAddresses.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">已保存的地址</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedAddresses.map((saved, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{saved.name}</h3>
                    <button
                      onClick={() => deleteAddress(index)}
                      className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded transition-colors"
                    >
                      删除
                    </button>
                  </div>
                  {saved.note && <p className="text-gray-600 dark:text-gray-400 mb-2">{saved.note}</p>}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p><strong>姓名：</strong>{saved.name}</p>
                      <button
                        onClick={() => copyToClipboard(saved.name, '姓名')}
                        className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors"
                      >
                        复制
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <p><strong>性别：</strong>{saved.gender}</p>
                      <button
                        onClick={() => copyToClipboard(saved.gender, '性别')}
                        className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors"
                      >
                        复制
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <p><strong>电话：</strong>{saved.phone}</p>
                      <button
                        onClick={() => copyToClipboard(saved.phone, '电话')}
                        className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors"
                      >
                        复制
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="w-3/4"><strong>地址：</strong>{saved.address}</p>
                      <button
                        onClick={() => copyToClipboard(saved.address, '地址')}
                        className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded transition-colors"
                      >
                        复制
                      </button>
                    </div>
                    {saved.isTaxFree && (
                      <div className="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold text-center">免税区</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">保存地址</h3>
              <input
                type="text"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="输入备注（可选）"
                className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                >
                  取消
                </button>
                <button
                  onClick={saveAddress}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
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
  
  return countries.map(({ name, code }) => (
    <option key={code} value={code} selected={code === selectedCountry}>
      {name}
    </option>
  ));
}
