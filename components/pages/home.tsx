'use client'

type RightState = 'available' | 'used' | 'expired'

interface Right {
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

interface HomeProps {
  rights: Right[]
  onClaimRight: (rightId: string) => void
}

function getStateBadge(state: RightState) {
  switch (state) {
    case 'available':
      return { label: 'Available', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' }
    case 'used':
      return { label: 'Used', bgColor: 'bg-gray-50', textColor: 'text-gray-700', borderColor: 'border-gray-200' }
    case 'expired':
      return { label: 'Expired', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-200' }
  }
}

export default function Home({ rights, onClaimRight }: HomeProps) {
  return (
    <div className="container py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Accept. Execute. Proof.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Redeem your digital rights in one tap. Receive instant, verifiable proof of execution.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rights.map((right) => {
          const stateBadge = getStateBadge(right.state)
          const isDisabled = right.state !== 'available'

          return (
            <div 
              key={right.id} 
              className={`card group ${isDisabled ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-black">{right.name}</h3>
                  <span className="text-xs text-gray-500 capitalize">{right.type}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{right.description}</p>

              <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">Expires {new Date(right.expiresAt).toLocaleDateString()}</span>
                <span className="text-sm font-semibold text-accent">{right.value}</span>
              </div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 ${stateBadge.bgColor} ${stateBadge.textColor} border ${stateBadge.borderColor}`}>
                {stateBadge.label}
              </div>

              <button
                onClick={() => onClaimRight(right.id)}
                disabled={isDisabled}
                className={`btn w-full ${isDisabled ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary'}`}
              >
                {right.state === 'used' ? 'Already Used' : right.state === 'expired' ? 'Expired' : 'View'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
