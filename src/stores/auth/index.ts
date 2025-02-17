import {defineStore} from "pinia";
import {ref} from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import {USER} from '@/utils/constants/user'
import type {AuthRequest, UserInfoResponse} from "@/utils/types/api/generatedApiGo";
import AuthService from "@/services/AuthService";
import {useRouter} from "vue-router";


export const userStartData: UserInfoResponse = {
  id: "",
  email: "",
  location: "",
  language: "",
  is_admin: false,
  email_verified_at: null,
  created_at: null,
  updated_at: null
};

export const setUserData = (data: UserInfoResponse): IUserResponse => {
  return {
    id: data.id ?? userStartData.id,
    email: data.email ?? userStartData.email,
    location: data.location ?? userStartData.location,
    language: data.language ?? userStartData.language,
    is_admin: data.is_admin ?? userStartData.is_admin,
    created_at: data.created_at ?? userStartData.created_at,
    updated_at: data.updated_at ?? userStartData.updated_at
  };
};


export const useAuthStore = defineStore('Auth', () => {
  const isLoggedIn = ref<boolean>(!!localStorage.getItem(USER.TOKEN_KEY_LS))
  const isLoading = ref<boolean>(false)
  const user = ref<UserInfoResponse>(cloneDeep(userStartData))

  const router = useRouter()

  const initStore = async (): Promise<void> => {
    try {
      await getUser()
      isLoggedIn.value = !!user.value
    } catch (error: any) {
      await removeToken()
      throw error
    }
  }


  const getUser = async () => {
    try {
      const data = await AuthService.getUserInfo()
      if (data) user.value = setUserData(data)
    } catch (error: any) {
      throw error
    }
  }

  const getToken = (): string | null => {
    return localStorage.getItem(USER.TOKEN_KEY_LS)
  }
  const setToken = (token: string): void => {
    localStorage.setItem(USER.TOKEN_KEY_LS, token)
  }

  const login = async (body: AuthRequest) => {
    try {
      isLoading.value = true
      const token = await AuthService.loginUser(body)
      setToken(token)
      await initStore()
      await router.push({ name: 'dashboard' })
    } catch (error: any) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    try {
      removeToken()
    } catch (error: any) {
      notify(error.message)
      throw error
    }
  }

  const removeToken = () => {
    localStorage.removeItem(USER.TOKEN_KEY_LS)
    isLoggedIn.value = false
    window.location.href = '/'
  }

  return {
    user,
    isLoggedIn,
    isLoading,
    initStore,
    login,
    logout
  }
})
