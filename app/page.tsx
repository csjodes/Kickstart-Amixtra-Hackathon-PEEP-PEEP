export default function PeepPeepAppPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-50 flex items-center justify-center p-8">
      <div className="max-w-xl mx-auto text-center">
        <div className="mb-8">
          <img src="../assets/images/logo.png" alt="PeepPeep Logo" className="w-48 h-20 mx-auto mb-6 object-contain" />
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mb-4">PeepPeep React Native App</h1>

        <p className="text-lg text-slate-600 mb-6">Davao City Jeepney Navigation System</p>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">App Structure</h2>
          <div className="space-y-2 text-left">
            <div className="flex items-center text-slate-600">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
              <code>app/index.tsx</code> - Home screen with interactive map
            </div>
            <div className="flex items-center text-slate-600">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
              <code>app/routes.tsx</code> - Route finder with Dijkstra algorithm
            </div>
            <div className="flex items-center text-slate-600">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
              <code>app/fares.tsx</code> - Fare calculator and pricing
            </div>
            <div className="flex items-center text-slate-600">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
              <code>utils/routeAlgorithm.ts</code> - Smart routing logic
            </div>
          </div>
        </div>

        <div className="bg-slate-100 rounded-xl p-4 text-sm text-slate-600">
          <p className="font-medium mb-2">Ready for Hackathon Pitch!</p>
          <p>All authentication removed, navigation simplified, and core features optimized for demo.</p>
        </div>
      </div>
    </div>
  )
}
