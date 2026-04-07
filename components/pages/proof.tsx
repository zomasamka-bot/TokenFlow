'use client'

interface ProofData {
  id: string
  rightId: string
  rightName: string
  timestamp: Date
  hash: string
  status: 'confirmed' | 'pending'
}

interface ProofProps {
  proofData: ProofData
  onContinue: () => void
}

export default function Proof({ proofData, onContinue }: ProofProps) {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <div className="card mb-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
              <span className="text-2xl text-white">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">Execution Confirmed</h1>
            <p className="text-gray-600">Your right has been successfully executed</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-8 text-left">
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Right Executed</p>
              <p className="text-xl font-semibold text-black">{proofData.rightName}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-500 mb-1">Executed At</p>
                <p className="font-mono text-sm text-black">
                  {proofData.timestamp.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Proof ID</p>
                <p className="font-mono text-sm text-black">{proofData.id}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Verification Hash</p>
              <p className="font-mono text-sm text-black break-all bg-white p-3 rounded border border-gray-200">
                {proofData.hash}
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-green-900">
              <strong>Status:</strong> This redemption has been permanently recorded and verified.
            </p>
          </div>

          <button
            onClick={onContinue}
            className="btn btn-primary w-full"
          >
            View Activity
          </button>
        </div>
      </div>
    </div>
  )
}
