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

interface UseRightProps {
  right: Right
  onExecute: () => void
  onBack: () => void
}

export default function UseRight({ right, onExecute, onBack }: UseRightProps) {
  return (
    <div className="container py-12">
      <button
        onClick={onBack}
        className="text-gray-600 hover:text-black mb-8 transition-colors"
      >
        ← Back
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Execute Right</h2>

          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">You are about to execute</p>
              <h3 className="text-2xl font-bold text-black mb-6">{right.name}</h3>

              <div className="bg-white rounded border border-gray-200 p-6 mb-6">
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <p className="text-gray-700">{right.description}</p>
              </div>

              <p className="text-xs text-gray-500">
                This action will create a permanent, verifiable record of your redemption.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-yellow-900">
              <strong>Important:</strong> Once executed, this right cannot be reversed. Make sure you want to proceed.
            </p>
          </div>

          {right.isPaid && right.amount && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-semibold mb-1">Payment Required</p>
                  <p className="text-xs text-blue-500">Complete payment to execute this right</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-900">${right.amount.toFixed(2)}</p>
                  <p className="text-xs text-blue-600 mt-1">USD</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-blue-600">
                  Your payment will be processed securely when you execute this right.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={onExecute}
              className="btn btn-accent flex-1"
            >
              Execute Now
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
    </div>
  )
}
