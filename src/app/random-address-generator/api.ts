// app/api/generate-address/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface AddressData {
  address: string;
  name: string;
  gender: string;
  phone: string;
}

// 姓氏数据
const lastNames = ['李', '王', '张', '刘', '陈', '杨', '黄', '赵', '吴', '周'];
const firstNames = ['明', '华', '建国', '小红', '伟', '秀英', '军', '丽', '强', '云'];

// 街道名称
const streets = {
  US: ['Main Street', 'Oak Avenue', 'Maple Drive', 'Washington Street', 'Park Road'],
  CN: ['人民路', '中山路', '解放大道', '建设街', '和平路'],
  JP: ['桜通り', '本町通', '銀座通り', '平和通り', '新宿通り'],
  // 可以继续添加其他国家的街道
};

// 城市数据
const cities = {
  US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  CN: ['北京', '上海', '广州', '深圳', '成都'],
  JP: ['東京', '大阪', '名古屋', '福岡', '札幌'],
  // 可以继续添加其他国家的城市
};

// 州/省数据
const states = {
  US: ['NY', 'CA', 'IL', 'TX', 'AZ'],
  CN: ['北京市', '上海市', '广东省', '四川省', '浙江省'],
  JP: ['東京都', '大阪府', '愛知県', '福岡県', '北海道'],
  // 可以继续添加其他国家的州/省
};

// 邮编格式
const zipFormats = {
  US: () => Math.floor(10000 + Math.random() * 90000).toString(),
  CN: () => Math.floor(100000 + Math.random() * 900000).toString(),
  JP: () => Math.floor(100 + Math.random() * 900).toString() + '-' + Math.floor(1000 + Math.random() * 9000).toString(),
  // 可以继续添加其他国家的邮编格式
};

// 电话号码格式
const phoneFormats = {
  US: () => `+1 ${Math.floor(200 + Math.random() * 800)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
  CN: () => `+86 ${Math.floor(130 + Math.random() * 70)}${Math.floor(10000000 + Math.random() * 90000000)}`,
  JP: () => `+81 ${Math.floor(70 + Math.random() * 20)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
  // 可以继续添加其他国家的电话格式
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateName(country: string): string {
  if (country === 'CN') {
    return getRandomElement(lastNames) + getRandomElement(firstNames);
  } else if (country === 'JP') {
    return getRandomElement(lastNames) + ' ' + getRandomElement(firstNames);
  } else {
    // 西方名字格式
    return getRandomElement(firstNames) + ' ' + getRandomElement(lastNames);
  }
}

function generateAddress(country: string): string {
  const buildingNumber = Math.floor(1 + Math.random() * 999);
  const street = getRandomElement(streets[country as keyof typeof streets] || streets.US);
  const city = getRandomElement(cities[country as keyof typeof cities] || cities.US);
  const state = getRandomElement(states[country as keyof typeof states] || states.US);
  const zip = (zipFormats[country as keyof typeof zipFormats] || zipFormats.US)();

  switch (country) {
    case 'CN':
      return `${state}${city}${street}${buildingNumber}号`;
    case 'JP':
      return `〒${zip} ${state}${city}${street}${buildingNumber}`;
    default:
      return `${buildingNumber} ${street}, ${city}, ${state} ${zip}`;
  }
}

function generatePhone(country: string): string {
  return (phoneFormats[country as keyof typeof phoneFormats] || phoneFormats.US)();
}

export async function POST(request: NextRequest) {
  try {
    const { country } = await request.json();

    // 生成随机性别
    const gender = Math.random() > 0.5 ? '男' : '女';

    const responseData: AddressData = {
      name: generateName(country),
      gender: gender,
      phone: generatePhone(country),
      address: generateAddress(country),
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error generating address:', error);
    return NextResponse.json(
      { error: 'Failed to generate address' },
      { status: 500 }
    );
  }
}