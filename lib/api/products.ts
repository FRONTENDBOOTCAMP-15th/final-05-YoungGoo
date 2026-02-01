// lib/api/product.ts
import type { SupplementItem } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/* ==============================
 * 공통 타입
 * ============================== */
export type ApiResponse<T> = {
  ok: 1 | 0;
  data: T;
  message?: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ProductListResponse = {
  ok: 1 | 0;
  data: SupplementItem[];
  pagination: Pagination;
  message?: string;
};

/* ==============================
 * ENV 체크
 * ============================== */
function assertEnv(): { apiUrl: string; clientId: string } {
  if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL 환경 변수가 없습니다.');
  if (!CLIENT_ID) throw new Error('NEXT_PUBLIC_CLIENT_ID 환경 변수가 없습니다.');
  return { apiUrl: API_URL, clientId: CLIENT_ID };
}

/* ==============================
 * 상품 목록 조회
 * ============================== */
export async function getProducts(categoryId?: string): Promise<ProductListResponse> {
  try {
    const { apiUrl, clientId } = assertEnv();

    const query = categoryId ? `?categoryId=${categoryId}` : '';
    const url = `${apiUrl}/products${query}`;

    const response = await fetch(url, {
      headers: {
        'Client-Id': clientId,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        ok: 0,
        data: [],
        pagination: {
          page: 1,
          limit: 0,
          total: 0,
          totalPages: 0,
        },
        message: `HTTP error! status: ${response.status}`,
      };
    }

    const json = (await response.json()) as ProductListResponse;

    if (json.ok !== 1 || !Array.isArray(json.data)) {
      return {
        ok: 0,
        data: [],
        pagination: {
          page: 1,
          limit: 0,
          total: 0,
          totalPages: 0,
        },
        message: json.message ?? '상품 목록 조회 실패',
      };
    }

    return json;
  } catch (err) {
    return {
      ok: 0,
      data: [],
      pagination: {
        page: 1,
        limit: 0,
        total: 0,
        totalPages: 0,
      },
      message: err instanceof Error ? err.message : '상품 목록 조회 실패',
    };
  }
}
