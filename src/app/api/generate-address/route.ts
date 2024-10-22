// app/api/generate-address/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface AddressData {
  address: string;
  name: string;
  gender: string;
  phone: string;
}

// 姓氏和名字数据
const names = {
  CN: {
    last: ['李', '王', '张', '刘', '陈', '杨', '黄', '赵', '吴', '周'],
    first: ['明', '华', '建国', '小红', '伟', '秀英', '军', '丽', '强', '云']
  },
  JP: {
    last: ['佐藤', '鈴木', '高橋', '田中', '渡辺', '伊藤', '山本', '中村', '小林', '加藤'],
    first: ['翔太', '陽菜', '大翔', '結衣', '颯太', '美咲', '拓海', 'さくら', '翔', '美羽']
  },
  US: {
    last: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'],
    first: ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth']
  },
  UK: {
    last: ['Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies', 'Robinson', 'Wright'],
    first: ['Oliver', 'Olivia', 'George', 'Amelia', 'Harry', 'Isla', 'Jack', 'Ava', 'Noah', 'Emily']
  },
  FR: {
    last: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau'],
    first: ['Gabriel', 'Emma', 'Raphaël', 'Léa', 'Louis', 'Chloé', 'Lucas', 'Manon', 'Adam', 'Jade']
  },
  DE: {
    last: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'],
    first: ['Ben', 'Emma', 'Paul', 'Mia', 'Leon', 'Sofia', 'Noah', 'Hannah', 'Luis', 'Anna']
  },
  TW: {
    last: ['陳', '林', '黃', '張', '李', '王', '吳', '劉', '蔡', '楊'],
    first: ['宏', '佳', '明', '慧', '志', '雅', '文', '婷', '怡', '俊']
  },
  HK: {
    last: ['陳', '李', '黃', '張', '劉', '王', '楊', '周', '吳', '梁'],
    first: ['志明', '美玲', '家豪', '詠詩', '俊傑', '淑芬', '偉強', '嘉欣', '建華', '慧珊']
  },
  IN: {
    last: ['Patel', 'Sharma', 'Singh', 'Kumar', 'Gupta', 'Desai', 'Shah', 'Mehta', 'Joshi', 'Chopra'],
    first: ['Aarav', 'Aadhya', 'Vihaan', 'Ananya', 'Advik', 'Anika', 'Reyansh', 'Ishaan', 'Advait', 'Zara']
  },
  AU: {
    last: ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White', 'Anderson', 'Thompson'],
    first: ['Oliver', 'Charlotte', 'Noah', 'Olivia', 'William', 'Ava', 'Jack', 'Mia', 'Leo', 'Grace']
  },
  BR: {
    last: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes'],
    first: ['Miguel', 'Alice', 'Arthur', 'Sophia', 'Bernardo', 'Helena', 'Heitor', 'Valentina', 'Davi', 'Laura']
  },
  CA: {
    last: ['Smith', 'Brown', 'Tremblay', 'Martin', 'Roy', 'Wilson', 'Macdonald', 'Gagnon', 'Johnson', 'Taylor'],
    first: ['Liam', 'Olivia', 'Noah', 'Emma', 'William', 'Charlotte', 'Benjamin', 'Ava', 'Lucas', 'Sophia']
  },
  RU: {
    last: ['Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов', 'Новиков', 'Федоров'],
    first: ['Александр', 'Мария', 'Дмитрий', 'Анна', 'Максим', 'Елена', 'Артем', 'Ольга', 'Иван', 'Татьяна']
  },
  ZA: {
    last: ['Nkosi', 'Van der Merwe', 'Ndlovu', 'Khumalo', 'Botha', 'Mokoena', 'Nel', 'De Villiers', 'Van Wyk', 'Molefe'],
    first: ['Bandile', 'Thando', 'Sipho', 'Nokuthula', 'Themba', 'Nomvula', 'Bongani', 'Zanele', 'Mandla', 'Precious']
  },
  MX: {
    last: ['García', 'Rodríguez', 'Martínez', 'López', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores'],
    first: ['Santiago', 'Sofía', 'Mateo', 'Valentina', 'Diego', 'Isabella', 'Sebastián', 'Camila', 'Emiliano', 'Victoria']
  },
  KR: {
    last: ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'],
    first: ['민준', '서연', '도윤', '서윤', '예준', '지우', '주원', '하은', '시우', '하윤']
  },
  IT: {
    last: ['Rossi', 'Ferrari', 'Russo', 'Bianchi', 'Romano', 'Gallo', 'Costa', 'Fontana', 'Conti', 'Esposito'],
    first: ['Francesco', 'Sofia', 'Alessandro', 'Aurora', 'Lorenzo', 'Giulia', 'Matteo', 'Ginevra', 'Leonardo', 'Alice']
  },
  ES: {
    last: ['García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martin'],
    first: ['Hugo', 'Lucía', 'Mateo', 'Sofía', 'Martín', 'María', 'Lucas', 'Paula', 'Leo', 'Daniela']
  },
  TR: {
    last: ['Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Yıldız', 'Erdoğan', 'Öztürk', 'Aydın', 'Özdemir'],
    first: ['Yusuf', 'Zeynep', 'Mehmet', 'Elif', 'Mustafa', 'Defne', 'Ahmet', 'Eylül', 'Ali', 'Azra']
  },
  SA: {
    last: ['Al-Saud', 'Al-Qahtani', 'Al-Ghamdi', 'Al-Zahrani', 'Al-Dossari', 'Al-Otaibi', 'Al-Shehri', 'Al-Harbi', 'Al-Qarni', 'Al-Malki'],
    first: ['Mohammed', 'Fatima', 'Abdullah', 'Aisha', 'Ahmed', 'Nora', 'Ali', 'Sara', 'Omar', 'Maryam']
  },
  AR: {
    last: ['González', 'Rodríguez', 'Gómez', 'Fernández', 'López', 'Díaz', 'Martínez', 'Pérez', 'García', 'Sánchez'],
    first: ['Mateo', 'Emma', 'Benjamín', 'Olivia', 'Joaquín', 'Martina', 'Bautista', 'Sofía', 'Felipe', 'Isabella']
  },
  EG: {
    last: ['Mohamed', 'Ahmed', 'Mahmoud', 'Ali', 'Hassan', 'Ibrahim', 'Mostafa', 'Abdelrahman', 'Youssef', 'Hossam'],
    first: ['Omar', 'Nour', 'Youssef', 'Malak', 'Ahmed', 'Farah', 'Mohamed', 'Jana', 'Ali', 'Lina']
  },
  NG: {
    last: ['Adebayo', 'Okafor', 'Okonkwo', 'Eze', 'Nnamani', 'Nwosu', 'Abubakar', 'Mohammed', 'Okorie', 'Okoye'],
    first: ['Chidi', 'Oluchi', 'Emeka', 'Adanna', 'Obinna', 'Chioma', 'Nnamdi', 'Amaka', 'Ikenna', 'Ngozi']
  },
  ID: {
    last: ['Wijaya', 'Tan', 'Gunawan', 'Susanto', 'Lim', 'Santoso', 'Ng', 'Hidayat', 'Tanuwidjaja', 'Halim'],
    first: ['Budi', 'Siti', 'Agus', 'Rina', 'Bambang', 'Dewi', 'Eko', 'Lina', 'Hadi', 'Yuni']
  }
};

// 街道名称
const streets = {
  US: ['Main Street', 'Oak Avenue', 'Maple Drive', 'Washington Street', 'Park Road', 'Elm Street', 'Cedar Lane', 'Pine Street', 'Broadway', 'Highland Avenue'],
  UK: ['High Street', 'Station Road', 'London Road', 'Church Street', 'Park Road', 'Victoria Road', 'Green Lane', 'Manor Road', 'King Street', 'Queen Street'],
  FR: ['Rue de la Paix', 'Avenue des Champs-Élysées', 'Rue du Faubourg Saint-Honoré', 'Boulevard Saint-Michel', 'Rue de Rivoli', 'Quai des Orfèvres', 'Avenue Montaigne', 'Rue Mouffetard', 'Boulevard Haussmann', 'Rue de la Pompe'],
  DE: ['Hauptstraße', 'Schulstraße', 'Bahnhofstraße', 'Gartenstraße', 'Kirchstraße', 'Bergstraße', 'Waldstraße', 'Ringstraße', 'Parkstraße', 'Lindenstraße'],
  CN: ['人民路', '中山路', '解放大道', '建设街', '和平路', '南京路', '长安街', '复兴路', '北京路', '天安门广场'],
  TW: ['中山路', '民生路', '中正路', '忠孝路', '信义路', '和平路', '光复路', '博爱路', '自由路', '民权路'],
  HK: ['彌敦道', '皇后大道', '德輔道', '軒尼詩道', '干諾道', '堅尼地城卑路乍街', '銅鑼灣道', '荃灣青山公路', '屯門鄉事會路', '元朗大馬路'],
  JP: ['桜通り', '本町通', '銀座通り', '平和通り', '新宿通り', '渋谷センター街', '表参道', '中央通り', '御堂筋', '大手町'],
  IN: ['MG Road', 'Park Street', 'Linking Road', 'Chandni Chowk', 'Brigade Road', 'Commercial Street', 'Necklace Road', 'Jubilee Hills Road', 'Anna Salai', 'Fergusson College Road'],
  AU: ['George Street', 'Collins Street', 'Pitt Street', 'Queen Street', 'Elizabeth Street', 'Bourke Street', 'King William Street', 'Murray Street', 'Macquarie Street', 'Flinders Street'],
  BR: ['Avenida Paulista', 'Rua Oscar Freire', 'Avenida Atlântica', 'Rua Augusta', 'Avenida Copacabana', 'Rua das Laranjeiras', 'Avenida Brigadeiro Faria Lima', 'Rua Gonçalo de Carvalho', 'Avenida Vieira Souto', 'Rua 25 de Março'],
  CA: ['Yonge Street', 'Bloor Street', 'Robson Street', 'Sainte-Catherine Street', 'Jasper Avenue', 'Portage Avenue', 'Granville Street', 'Elgin Street', 'Rue Saint-Jean', 'Whyte Avenue'],
  RU: ['Tverskaya Street', 'Nevsky Prospect', 'Arbat Street', 'Kutuzovsky Prospect', 'Leninsky Prospect', 'Bolshaya Sadovaya Street', 'Volgogradsky Prospect', 'Leninskiy Prospekt', 'Prospekt Mira', 'Ulitsa Baumana'],
  ZA: ['Long Street', 'Vilakazi Street', 'Oxford Road', 'Florida Road', 'Adderley Street', 'Nelson Mandela Boulevard', 'Jan Smuts Avenue', 'Sandton Drive', 'Victoria Road', 'Main Road'],
  MX: ['Paseo de la Reforma', 'Avenida Insurgentes', 'Avenida Presidente Masaryk', 'Calle Madero', 'Avenida Álvaro Obregón', 'Avenida Revolución', 'Calzada de Tlalpan', 'Avenida Chapultepec', 'Paseo de los Tamarindos', 'Avenida Universidad'],
  KR: ['강남대로', '테헤란로', '종로', '을지로', '압구정로', '청담동', '명동', '이태원로', '가로수길', '삼성로'],
  IT: ['Via del Corso', 'Via Condotti', 'Via Veneto', 'Via Montenapoleone', 'Via Toledo', 'Corso Buenos Aires', 'Via dei Fori Imperiali', 'Via della Conciliazione', 'Strada Nuova', 'Via Mazzini'],
  ES: ['Gran Vía', 'Paseo de la Castellana', 'Calle Serrano', 'La Rambla', 'Calle Princesa', 'Paseo del Prado', 'Calle Mayor', 'Avenida Diagonal', 'Calle Alcalá', 'Paseo de Gracia'],
  TR: ['İstiklal Caddesi', 'Bağdat Caddesi', 'Abdi İpekçi Caddesi', 'Nispetiye Caddesi', 'Cumhuriyet Caddesi', 'Atatürk Bulvarı', 'Barbaros Bulvarı', 'Vali Konağı Caddesi', 'Alemdar Caddesi', 'Moda Caddesi'],
  SA: ['King Fahd Road', 'Olaya Street', 'Tahlia Street', 'Prince Muhammad Bin Abdulaziz Road', 'King Abdullah Road', 'Makkah Road', 'Khurais Road', 'Al-Takhassusi Street', 'King Khalid Road', 'Palestine Street'],
  AR: ['Avenida 9 de Julio', 'Avenida Corrientes', 'Avenida Santa Fe', 'Calle Florida', 'Avenida de Mayo', 'Avenida Alvear', 'Calle Defensa', 'Avenida Cabildo', 'Avenida Libertador', 'Calle Lavalle'],
  EG: ['26th of July Corridor', 'El-Moez Street', 'Talaat Harb Street', 'Qasr El Nil Street', 'Sharia Al Mu\'izz li-Din Allah', 'Corniche El Nile', 'Salah Salem Street', 'Ramses Street', 'Ahmed Orabi Street', 'Gameat El Dowal El Arabeya Street'],
  NG: ['Adeola Odeku Street', 'Awolowo Road', 'Broad Street', 'Herbert Macaulay Way', 'Ahmadu Bello Way', 'Adetokunbo Ademola Street', 'Yakubu Gowon Crescent', 'Nnamdi Azikiwe Street', 'Tafawa Balewa Square', 'Murtala Muhammed Way'],
  ID: ['Jalan Malioboro', 'Jalan Thamrin', 'Jalan Sudirman', 'Jalan Asia Afrika', 'Jalan Braga', 'Jalan Gajah Mada', 'Jalan Diponegoro', 'Jalan Pemuda', 'Jalan Pahlawan', 'Jalan Merdeka'],
};

function getRandomStreet(country: string): string {
  const countryStreets = streets[country as keyof typeof streets];
  return countryStreets ? getRandomElement(countryStreets) : getRandomElement(streets.US);
}

// 城市数据
const cities = {
  US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
  UK: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Leicester'],
  FR: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
  DE: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
  CN: ['北京', '上海', '广州', '深圳', '成都', '重庆', '杭州', '武汉', '西安', '苏州'],
  TW: ['台北', '高雄', '台中', '台南', '桃园', '新竹', '嘉义', '基隆', '彰化', '宜兰'],
  HK: ['中西区', '湾仔', '东区', '南区', '油尖旺', '深水埗', '九龙城', '黄大仙', '观塘', '荃湾'],
  JP: ['東京', '横浜', '大阪', '名古屋', '札幌', '福岡', '神戸', '京都', '川崎', 'さいたま'],
  IN: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur'],
  AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Wollongong', 'Logan City'],
  BR: ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Brasília', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
  CA: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
  RU: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Nizhny Novgorod', 'Kazan', 'Chelyabinsk', 'Omsk', 'Samara', 'Rostov-on-Don'],
  ZA: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein', 'Nelspruit', 'Kimberley', 'Polokwane', 'Pietermaritzburg'],
  MX: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Juárez', 'Zapopan', 'Mérida', 'San Luis Potosí'],
  KR: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Goyang'],
  IT: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
  ES: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
  TR: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana', 'Gaziantep', 'Konya', 'Antalya', 'Kayseri', 'Mersin'],
  SA: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Taif', 'Tabuk', 'Buraidah', 'Khamis Mushait', 'Abha'],
  AR: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Tucumán', 'Mar del Plata', 'Salta', 'Santa Fe', 'San Juan'],
  EG: ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez', 'Luxor', 'Mansoura', 'Tanta', 'Asyut'],
  NG: ['Lagos', 'Kano', 'Ibadan', 'Kaduna', 'Port Harcourt', 'Benin City', 'Maiduguri', 'Zaria', 'Aba', 'Jos'],
  ID: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar', 'Palembang', 'Tangerang', 'Depok', 'Padang'],
};

function getRandomCity(country: string): string {
  const countryCities = cities[country as keyof typeof cities];
  return countryCities ? getRandomElement(countryCities) : getRandomElement(cities.US);
}

// 州/省数据
const states = {
  US: ['New York', 'California', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'],
  UK: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  FR: ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Hauts-de-France', 'Provence-Alpes-Côte d\'Azur', 'Occitanie', 'Nouvelle-Aquitaine', 'Grand Est', 'Normandie', 'Bretagne', 'Pays de la Loire'],
  DE: ['Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Lower Saxony', 'Hesse', 'Saxony', 'Rhineland-Palatinate', 'Berlin', 'Schleswig-Holstein', 'Brandenburg'],
  CN: ['北京市', '上海市', '广东省', '江苏省', '浙江省', '山东省', '河南省', '四川省', '湖北省', '福建省'],
  TW: ['台北市', '新北市', '桃园市', '台中市', '台南市', '高雄市', '基隆市', '新竹市', '嘉义市'],
  HK: ['香港岛', '九龙', '新界'],
  JP: ['東京都', '大阪府', '愛知県', '神奈川県', '福岡県', '北海道', '兵庫県', '千葉県', '埼玉県', '静岡県'],
  IN: ['Maharashtra', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Madhya Pradesh', 'Tamil Nadu', 'Rajasthan', 'Karnataka', 'Gujarat', 'Andhra Pradesh'],
  AU: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'],
  BR: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'Paraná', 'Rio Grande do Sul', 'Pernambuco', 'Ceará', 'Pará', 'Santa Catarina'],
  CA: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador', 'Prince Edward Island'],
  RU: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Nizhny Novgorod', 'Kazan', 'Chelyabinsk', 'Omsk', 'Samara', 'Rostov-on-Don'],
  ZA: ['Gauteng', 'KwaZulu-Natal', 'Western Cape', 'Eastern Cape', 'Limpopo', 'Mpumalanga', 'North West', 'Free State', 'Northern Cape'],
  MX: ['Mexico City', 'State of Mexico', 'Jalisco', 'Nuevo León', 'Veracruz', 'Guanajuato', 'Chihuahua', 'Puebla', 'Sonora', 'Tamaulipas'],
  KR: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Ulsan', 'Sejong', 'Gyeonggi-do', 'Gangwon-do'],
  IT: ['Lombardy', 'Lazio', 'Campania', 'Sicily', 'Veneto', 'Emilia-Romagna', 'Piedmont', 'Apulia', 'Tuscany', 'Calabria'],
  ES: ['Madrid', 'Catalonia', 'Andalusia', 'Valencia', 'Galicia', 'Castile and León', 'Basque Country', 'Castilla–La Mancha', 'Canary Islands', 'Murcia'],
  TR: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Sanliurfa', 'Mersin'],
  SA: ['Riyadh', 'Makkah', 'Eastern Province', 'Madinah', 'Asir', 'Jizan', 'Tabuk', 'Hail', 'Al-Qassim', 'Najran'],
  AR: ['Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza', 'Tucumán', 'Entre Ríos', 'Salta', 'Chaco', 'Corrientes', 'Misiones'],
  EG: ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez', 'Luxor', 'Mansoura', 'Tanta', 'Asyut'],
  NG: ['Lagos', 'Kano', 'Ibadan', 'Kaduna', 'Port Harcourt', 'Benin City', 'Maiduguri', 'Zaria', 'Aba', 'Jos'],
  ID: ['Jakarta', 'East Java', 'West Java', 'Central Java', 'North Sumatra', 'South Sulawesi', 'Banten', 'West Sumatra', 'Lampung', 'Riau'],
};

function getRandomState(country: string): string {
  const countryStates = states[country as keyof typeof states];
  return countryStates ? getRandomElement(countryStates) : getRandomElement(states.US);
}

// 邮编格式
const zipFormats: { [key: string]: () => string } = {
  US: () => Math.floor(10000 + Math.random() * 90000).toString(), // 5位数字
  UK: () => {
    const area = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const district = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const sector = Math.floor(1 + Math.random() * 9);
    const unit = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const number = Math.floor(1 + Math.random() * 9);
    return `${area}${district}${sector} ${unit}${number}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  },
  FR: () => Math.floor(10000 + Math.random() * 90000).toString(), // 5位数字
  DE: () => Math.floor(10000 + Math.random() * 90000).toString(), // 5位数字
  CN: () => Math.floor(100000 + Math.random() * 900000).toString(), // 6位数字
  TW: () => Math.floor(100 + Math.random() * 900).toString(), // 3位数字
  HK: () => '', // 香港不使用邮政编码
  JP: () => Math.floor(100 + Math.random() * 900).toString() + '-' + Math.floor(1000 + Math.random() * 9000).toString(), // 3位数字-4位数字
  IN: () => Math.floor(100000 + Math.random() * 900000).toString(), // 6位数字
  AU: () => Math.floor(1000 + Math.random() * 9000).toString(), // 4位数字
  BR: () => Math.floor(10000000 + Math.random() * 90000000).toString().replace(/(\d{5})(\d{3})/, '$1-$2'), // 5位数字-3位数字
  CA: () => {
    const letters = 'ABCEGHJKLMNPRSTVXY';
    return letters[Math.floor(Math.random() * letters.length)] + Math.floor(1 + Math.random() * 9) + letters[Math.floor(Math.random() * letters.length)] + ' ' +
           Math.floor(1 + Math.random() * 9) + letters[Math.floor(Math.random() * letters.length)] + Math.floor(1 + Math.random() * 9);
  },
  RU: () => Math.floor(100000 + Math.random() * 900000).toString(), // 6位数字
  ZA: () => Math.floor(1000 + Math.random() * 9000).toString(), // 4位数字
  MX: () => Math.floor(10000 + Math.random() * 90000).toString(), // 5位数字
  KR: () => Math.floor(10000 + Math.random() * 90000).toString(), // 5位数字
  IT: () => Math.floor(10000 + Math.random() * 90000).toString(), // 5位数字
  ES: () => Math.floor(10000 + Math.random() * 90000).toString(), // 5位数字
  TR: () => Math.floor(10000 + Math.random() * 90000).toString(), // 5位数字
  SA: () => Math.floor(10000 + Math.random() * 90000).toString(), // 5位数字
  AR: () => String(Math.floor(1000 + Math.random() * 9000)) + String(Math.floor(Math.random() * 1000)).padStart(3, '0'), // 4位数字 + 3位数字（可能有前导零）
  EG: () => Math.floor(10000 + Math.random() * 90000).toString(), // 5位数字
  NG: () => Math.floor(100000 + Math.random() * 900000).toString(), // 6位数字
  ID: () => Math.floor(10000 + Math.random() * 90000).toString(), // 5位数字
};

function generateZip(country: string): string {
  return (zipFormats[country] || zipFormats['US'])();
}

// 电话号码格式
const phoneFormats: { [key: string]: () => string } = {
  US: () => `+1 ${Math.floor(200 + Math.random() * 800)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
  UK: () => `+44 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`,
  FR: () => `+33 ${Math.floor(1 + Math.random() * 9)}${Math.floor(10000000 + Math.random() * 90000000)}`,
  DE: () => `+49 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000000 + Math.random() * 9000000)}`,
  CN: () => `+86 ${Math.floor(130 + Math.random() * 70)}${Math.floor(10000000 + Math.random() * 90000000)}`,
  TW: () => `+886 ${Math.floor(900 + Math.random() * 100)}${Math.floor(100000 + Math.random() * 900000)}`,
  HK: () => `+852 ${Math.floor(5000 + Math.random() * 5000)}${Math.floor(1000 + Math.random() * 9000)}`,
  JP: () => `+81 ${Math.floor(70 + Math.random() * 20)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
  IN: () => `+91 ${Math.floor(70000 + Math.random() * 30000)}${Math.floor(10000 + Math.random() * 90000)}`,
  AU: () => `+61 ${Math.floor(400 + Math.random() * 500)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`,
  BR: () => `+55 ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(1000 + Math.random() * 9000)}`,
  CA: () => `+1 ${Math.floor(200 + Math.random() * 800)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
  RU: () => `+7 ${Math.floor(900 + Math.random() * 100)}${Math.floor(1000000 + Math.random() * 9000000)}`,
  ZA: () => `+27 ${Math.floor(60 + Math.random() * 30)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`,
  MX: () => `+52 ${Math.floor(200 + Math.random() * 800)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`,
  KR: () => `+82 ${Math.floor(10 + Math.random() * 90)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
  IT: () => `+39 ${Math.floor(300 + Math.random() * 700)} ${Math.floor(1000000 + Math.random() * 9000000)}`,
  ES: () => `+34 ${Math.floor(600 + Math.random() * 300)} ${Math.floor(100000 + Math.random() * 900000)}`,
  TR: () => `+90 ${Math.floor(500 + Math.random() * 500)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`,
  SA: () => `+966 ${Math.floor(50 + Math.random() * 50)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`,
  AR: () => `+54 ${Math.floor(9 + Math.random() * 2)}${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  EG: () => `+20 ${Math.floor(10 + Math.random() * 90)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
  NG: () => `+234 ${Math.floor(700 + Math.random() * 300)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`,
  ID: () => `+62 ${Math.floor(800 + Math.random() * 200)}${Math.floor(1000000 + Math.random() * 9000000)}`,
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateName(country: string): string {
  const nameData = names[country as keyof typeof names] || names.US;
  const lastName = getRandomElement(nameData.last);
  const firstName = getRandomElement(nameData.first);

  switch (country) {
    case 'CN':
      return lastName + firstName;
    case 'JP':
      return lastName + ' ' + firstName;
    default:
      return firstName + ' ' + lastName;
  }
}

function generateAddress(country: string): string {
  const buildingNumber = Math.floor(1 + Math.random() * 999);
  const street = getRandomStreet(country);
  const city = getRandomCity(country);
  const state = getRandomState(country);
  const zip = generateZip(country);

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
  return (phoneFormats[country] || phoneFormats['US'])();
}

export async function POST(request: NextRequest) {
  try {
    const { country } = await request.json();

    if (!country || typeof country !== 'string') {
      return NextResponse.json({ error: 'Invalid country parameter' }, { status: 400 });
    }

    const supportedCountries = [
      'US', 'UK', 'FR', 'DE', 'CN', 'TW', 'HK', 'JP', 'IN', 'AU', 
      'BR', 'CA', 'RU', 'ZA', 'MX', 'KR', 'IT', 'ES', 'TR', 'SA', 
      'AR', 'EG', 'NG', 'ID'
    ];
    if (!supportedCountries.includes(country)) {
      return NextResponse.json({ error: 'Unsupported country' }, { status: 400 });
    }

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
