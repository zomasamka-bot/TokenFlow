'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Home from '@/components/pages/home'
import RightDetail from '@/components/pages/right-detail'
import UseRight from '@/components/pages/use-right'
import Proof from '@/components/pages/proof'
import Activity from '@/components/pages/activity'

type PageView = 'home' | 'detail' | 'use' | 'proof' | 'activity'
type RightState = 'available' | 'used' | 'expired'

type RightType = {
  id: string
  name: string
  description: string
  value: string
  expiresAt: string
  type: 'membership' | 'discount' | 'service'
  state: RightState
  isPaid?: boolean
  amount?: number
}

const MOCK_RIGHTS: RightType[] = [
  {
    id: '1',
    name: 'Premium Membership',
    description: '3 months of premium access to exclusive features',
    value: 'Activated',
    expiresAt: '2025-12-31',
    type: 'membership',
    state: 'available',
    isPaid: true,
    amount: 29.99,
  },
  {
    id: '2',
    name: '30% Discount',
    description: 'Discount on your next purchase',
    value: '$150 value',
    expiresAt: '2025-06-30',
    type: 'discount',
    state: 'available',
  },
  {
    id: '3',
    name: 'VIP Support',
    description: 'Priority customer support access',
    value: 'Active',
    expiresAt: '2025-09-30',
    type: 'service',
    state: 'used',
  },
  {
    id: '4',
    name: 'Early Bird Special',
    description: 'Limited time offer for new members',
    value: 'Expired',
    expiresAt: '2024-12-31',
    type: 'discount',
    state: 'expired',
  },
]

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home')
  const [selectedRight, setSelectedRight] = useState<RightType | null>(null)
  const [rights, setRights] = useState<RightType[]>(MOCK_RIGHTS)
  const [executedRights, setExecutedRights] = useState<any[]>([])
  const [proofData, setProofData] = useState<any>(null)

  const handleClaimRight = (rightId: string) => {
    const right = rights.find(r => r.id === rightId)
    if (right) {
      setSelectedRight(right)
      setCurrentPage('detail')
    }
  }

  const handleUseRight = () => {
    setCurrentPage('use')
  }

  const handleExecute = () => {
    if (selectedRight) {
      const proof = {
        id: Math.random().toString(36).substring(7),
        rightId: selectedRight.id,
        rightName: selectedRight.name,
        timestamp: new Date(),
        hash: Math.random().toString(36).substring(2, 15).toUpperCase(),
        status: 'confirmed',
      }
      setProofData(proof)
      setExecutedRights([...executedRights, proof])

      // Update right state to used
      setRights(rights.map(r => 
        r.id === selectedRight.id ? { ...r, state: 'used' as RightState } : r
      ))

      setCurrentPage('proof')
    }
  }

  const handleViewActivity = () => {
    setCurrentPage('activity')
  }

  const handleBackHome = () => {
    setCurrentPage('home')
    setSelectedRight(null)
  }

  const handleBackToDetail = () => {
    setCurrentPage('detail')
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentPage={currentPage}
        onActivityClick={handleViewActivity} 
        onHomeClick={handleBackHome} 
      />
      
      <main className="pt-20">
        {currentPage === 'home' && (
          <Home rights={rights} onClaimRight={handleClaimRight} />
        )}
        {currentPage === 'detail' && selectedRight && (
          <RightDetail 
            right={selectedRight} 
            onUseRight={handleUseRight} 
            onBack={handleBackHome} 
          />
        )}
        {currentPage === 'use' && selectedRight && (
          <UseRight 
            right={selectedRight} 
            onExecute={handleExecute} 
            onBack={handleBackToDetail} 
          />
        )}
        {currentPage === 'proof' && proofData && (
          <Proof 
            proofData={proofData} 
            onContinue={handleViewActivity} 
          />
        )}
        {currentPage === 'activity' && (
          <Activity 
            activities={executedRights} 
            onBack={handleBackHome} 
          />
        )}
      </main>
    </div>
  )
}
