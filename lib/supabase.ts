import { createClient } from '@supabase/supabase-js'

// 環境変数の型チェック
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase環境変数が設定されていません。SUPABASE_SETUP.mdを参照してください。')
}

// Supabaseクライアントの作成（環境変数が設定されている場合のみ）
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    )
  : null as any

// 申込データの型定義
export interface Application {
  id?: string
  child_name: string
  grade: string
  parent_name?: string
  phone: string
  email: string
  participant_count: number
  notes?: string
  created_at?: string
  updated_at?: string
}

// 申込データを保存
export async function saveApplication(data: Omit<Application, 'id' | 'created_at' | 'updated_at'>) {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' }
  }
  
  try {
    const { data: result, error } = await supabase
      .from('applications')
      .insert([data])
      .select()
      .single()

    if (error) throw error
    return { success: true, data: result }
  } catch (error) {
    console.error('申込保存エラー:', error)
    return { success: false, error }
  }
}

// 申込データを取得
export async function getApplications() {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured', data: [] }
  }
  
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('申込取得エラー:', error)
    return { success: false, error, data: [] }
  }
}

// 申込データを検索
export async function searchApplications(searchTerm: string) {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured', data: [] }
  }
  
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .or(`child_name.ilike.%${searchTerm}%,parent_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('検索エラー:', error)
    return { success: false, error, data: [] }
  }
}

// 申込データを削除（管理者のみ）
export async function deleteApplication(id: string) {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' }
  }
  
  try {
    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('削除エラー:', error)
    return { success: false, error }
  }
}

// Supabaseが利用可能かチェック
export function isSupabaseConfigured() {
  return !!(supabaseUrl && supabaseAnonKey)
}