'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { type TenantConfig, getCurrentTenant } from './config'

const TenantContext = createContext<TenantConfig | null>(null)

export function TenantProvider({ 
  children,
  tenant 
}: { 
  children: ReactNode
  tenant?: TenantConfig 
}) {
  const config = tenant || getCurrentTenant()
  
  return (
    <TenantContext.Provider value={config}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant(): TenantConfig {
  const context = useContext(TenantContext)
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return context
}
