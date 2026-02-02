import { MongoClient } from 'mongodb';
import 'dotenv/config';

// 카테고리별 이미지 맵
const categoryImages = {
  diet: '/images/category/diet.png',
  eye: '/images/category/eye_health.png',
  gut: '/images/category/gut_health.png',
  immune_faigue: '/images/category/immune_energe.png',
  skin_hair: '/images/category/skin_hair.png',
  woman: '/images/category/womans_health.png',
  brain: '/images/category/brain_focus.png',
  blood_flow: '/images/category/circulation.png',
  bone_joint: '/images/category/bone_joint.png',
  general: '/images/category/general.png',
};

// products 배열
const products = [
  {
    _id: 1,
    createdAt: '2026.02.02 00:29:31',
    updatedAt: '2026.02.02 00:29:31',
    mainId: 'diet_garcinia',
    categoryId: 'diet',
    name: '가르시니아 캄보지아',
    content: '영양제를 드셔보세요!',
    mainNutrients: ['HCA'],
    mainFunctions: ['탄수화물의 지방 전환 억제', '체지방 감소'],
    intakeGuide: '식사 30분 전 섭취',
    precautions: ['위장 장애 주의', '임산부 섭취 금지'],
    storage: '서늘하고 건조한 곳',
    nutritionInfoExample: { servingSize: '750mg', nutrients: [{ name: 'HCA', amount: '750mg', dailyValue: '100%' }] },
    seller_id: 1,
    price: 6000,
    quantity: 600,
    show: true,
    active: true,
    views: 8,
  },
  {
    _id: 2,
    createdAt: '2026.02.02 00:29:31',
    updatedAt: '2026.02.02 00:29:31',
    mainId: 'general_multivitamin',
    categoryId: 'general',
    name: '종합비타민',
    content: '영양제를 드셔보세요!',
    mainNutrients: ['비타민 A', 'B군', 'C', 'D', 'E'],
    mainFunctions: ['전반적인 건강 유지'],
    intakeGuide: '식후 섭취',
    precautions: ['다른 비타민과 중복 섭취 주의'],
    storage: '서늘한 곳',
    nutritionInfoExample: { servingSize: '1정', nutrients: [{ name: '비타민 복합', amount: '-', dailyValue: '-' }] },
    seller_id: 1,
    price: 18000,
    quantity: 600,
    show: true,
    active: true,
    views: 4,
  },
  {
    _id: 3,
    createdAt: '2026.02.02 00:29:31',
    updatedAt: '2026.02.02 00:29:31',
    mainId: 'diet_garcinia',
    categoryId: 'diet',
    name: '가르시니아 캄보지아',
    content: '영양제를 드셔보세요!',
    mainNutrients: ['HCA'],
    mainFunctions: ['탄수화물의 지방 전환 억제', '체지방 감소'],
    intakeGuide: '식사 30분 전 섭취',
    precautions: ['위장 장애 주의', '임산부 섭취 금지'],
    storage: '서늘하고 건조한 곳',
    nutritionInfoExample: { servingSize: '750mg', nutrients: [{ name: 'HCA', amount: '750mg', dailyValue: '100%' }] },
    seller_id: 1,
    price: 6000,
    quantity: 600,
    show: true,
    active: true,
    views: 3,
  },
  {
    _id: 4,
    createdAt: '2026.02.02 00:29:31',
    updatedAt: '2026.02.02 00:29:31',
    mainId: 'diet_garcinia',
    categoryId: 'diet',
    name: '비타민 C',
    content: '영양제를 드셔보세요!',
    mainNutrients: ['HCA'],
    mainFunctions: ['탄수화물의 지방 전환 억제', '체지방 감소'],
    intakeGuide: '식사 30분 전 섭취',
    precautions: ['위장 장애 주의', '임산부 섭취 금지'],
    storage: '서늘하고 건조한 곳',
    nutritionInfoExample: { servingSize: '750mg', nutrients: [{ name: 'HCA', amount: '750mg', dailyValue: '100%' }] },
    seller_id: 1,
    price: 6000,
    quantity: 600,
    show: true,
    active: true,
    views: 28,
  },
  {
    _id: 5,
    createdAt: '2026.02.02 01:00:00',
    updatedAt: '2026.02.02 01:00:00',
    mainId: 'diet_lcarnitine',
    categoryId: 'diet',
    name: 'L-카르니틴',
    content: '체지방 연소에 도움을 주는 영양제입니다.',
    mainNutrients: ['L-Carnitine'],
    mainFunctions: ['지방 연소 촉진', '체지방 감소'],
    intakeGuide: '운동 30분 전 섭취',
    precautions: ['과다 섭취 주의'],
    storage: '서늘하고 건조한 곳',
    nutritionInfoExample: { servingSize: '500mg', nutrients: [{ name: 'L-Carnitine', amount: '500mg', dailyValue: '100%' }] },
    seller_id: 1,
    price: 8000,
    quantity: 500,
    show: true,
    active: true,
    views: 0,
  },
  // … 6번~22번까지 동일한 방식으로 붙이기 …
];

// 이미지 URL 자동 연결
const productsWithImages = products.map((p) => ({
  ...p,
  imageUrl: categoryImages[p.categoryId] || '/images/category/general.png',
}));

async function main() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db('febc15-final05-ecad');
  const collection = db.collection('product');

  // 기존 데이터 삭제 (테스트용)
  await collection.deleteMany({});

  // 데이터 삽입
  const result = await collection.insertMany(productsWithImages);
  console.log(`${result.insertedCount}개의 상품이 삽입되었습니다.`);

  await client.close();
}

main().catch(console.error);
