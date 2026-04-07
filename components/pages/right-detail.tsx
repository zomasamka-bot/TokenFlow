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

interface RightDetailProps {
  right: Right
  onUseRight: () => void
  onBack: () => void
}

function getStateMessage(state: RightState): string {
  switch (state) {
    case 'available':
      return 'This right is ready to be executed. When you tap "Use Right", your redemption will be recorded with verifiable proof.'
    case 'used':
      return 'This right has already been executed and cannot be used again.'
    case 'expired':
      return 'This right has expired and is no longer valid. No further action can be taken.'
  }
}

export default function RightDetail({ right, onUseRight, onBack }: RightDetailProps) {
  const isExecutable = right.state === 'available'
  const stateColors = {
    available: 'bg-green-50 border-green-200 text-green-900',
    used: 'bg-gray-50 border-gray-200 text-gray-900',
    expired: 'bg-red-50 border-red-200 text-red-900',
  }

  return (
    <div className="container py-12">
      <button
        onClick={onBack}
        className="text-gray-600 hover:text-black mb-8 transition-colors"
      >
        ← Back
      </button>

      <div className="max-w-2xl">
        <div className="card mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wide">{right.type}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-black mt-2">{right.name}</h1>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold border ${stateColors[right.state]}`}>
              {right.state.charAt(0).toUpperCase() + right.state.slice(1)}
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-8">{right.description}</p>

          <div className="grid grid-cols-2 gap-6 py-6 border-t border-b border-gray-200">
            <div>
              <span className="text-sm text-gray-500">Value</span>
              <p className="text-2xl font-bold text-black mt-1">{right.value}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Expires</span>
              <p className="text-2xl font-bold text-black mt-1">
                {new Date(right.expiresAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            {getStateMessage(right.state)}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onUseRight}
            disabled={!isExecutable}
            className={`btn flex-1 ${isExecutable ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
          >
            {right.state === 'used' ? 'Already Used' : right.state === 'expired' ? 'Expired' : 'Use Right'}
          </button>
          <button
            onClick={onBack}
            className="btn btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
