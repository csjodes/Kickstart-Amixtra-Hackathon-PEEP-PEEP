interface RouteNode {
  id: string
  name: string
  connections: { nodeId: string; distance: number; fare: number; time: number }[]
}

interface RouteResult {
  path: string[]
  totalDistance: number
  totalFare: number
  totalTime: number
  routeDetails: string[]
}

// Davao City route network based on the 5 main routes
const ROUTE_NETWORK: RouteNode[] = [
  {
    id: "matina_aplaya",
    name: "Matina Aplaya",
    connections: [{ nodeId: "agdao", distance: 8.5, fare: 15, time: 20 }],
  },
  {
    id: "agdao",
    name: "Agdao",
    connections: [
      { nodeId: "matina_aplaya", distance: 8.5, fare: 15, time: 20 },
      { nodeId: "roxas", distance: 5.2, fare: 12, time: 12 },
      { nodeId: "downtown", distance: 3.8, fare: 10, time: 8 },
    ],
  },
  {
    id: "toril",
    name: "Toril",
    connections: [
      { nodeId: "roxas", distance: 12.3, fare: 18, time: 25 },
      { nodeId: "mintal", distance: 6.7, fare: 12, time: 15 },
    ],
  },
  {
    id: "roxas",
    name: "Roxas Avenue",
    connections: [
      { nodeId: "toril", distance: 12.3, fare: 18, time: 25 },
      { nodeId: "agdao", distance: 5.2, fare: 12, time: 12 },
      { nodeId: "mintal", distance: 8.9, fare: 15, time: 18 },
      { nodeId: "downtown", distance: 4.1, fare: 10, time: 10 },
    ],
  },
  {
    id: "mintal",
    name: "Mintal",
    connections: [
      { nodeId: "toril", distance: 6.7, fare: 12, time: 15 },
      { nodeId: "roxas", distance: 8.9, fare: 15, time: 18 },
    ],
  },
  {
    id: "ulas",
    name: "Ulas",
    connections: [
      { nodeId: "magsaysay", distance: 7.4, fare: 15, time: 16 },
      { nodeId: "downtown", distance: 9.2, fare: 15, time: 20 },
    ],
  },
  {
    id: "magsaysay",
    name: "Magsaysay Avenue",
    connections: [
      { nodeId: "ulas", distance: 7.4, fare: 15, time: 16 },
      { nodeId: "sasa", distance: 5.8, fare: 12, time: 12 },
      { nodeId: "downtown", distance: 3.5, fare: 10, time: 8 },
    ],
  },
  {
    id: "sasa",
    name: "Sasa",
    connections: [
      { nodeId: "jp_laurel", distance: 4.2, fare: 10, time: 9 },
      { nodeId: "magsaysay", distance: 5.8, fare: 12, time: 12 },
    ],
  },
  {
    id: "jp_laurel",
    name: "JP Laurel Avenue",
    connections: [
      { nodeId: "sasa", distance: 4.2, fare: 10, time: 9 },
      { nodeId: "downtown", distance: 6.1, fare: 12, time: 14 },
    ],
  },
  {
    id: "downtown",
    name: "Downtown Davao",
    connections: [
      { nodeId: "agdao", distance: 3.8, fare: 10, time: 8 },
      { nodeId: "roxas", distance: 4.1, fare: 10, time: 10 },
      { nodeId: "ulas", distance: 9.2, fare: 15, time: 20 },
      { nodeId: "magsaysay", distance: 3.5, fare: 10, time: 8 },
      { nodeId: "jp_laurel", distance: 6.1, fare: 12, time: 14 },
    ],
  },
]

export function findOptimalRoute(from: string, to: string, optimizeFor: "time" | "fare" = "time"): RouteResult | null {
  const fromNode = ROUTE_NETWORK.find(
    (node) =>
      node.name.toLowerCase().includes(from.toLowerCase()) || from.toLowerCase().includes(node.name.toLowerCase()),
  )

  const toNode = ROUTE_NETWORK.find(
    (node) => node.name.toLowerCase().includes(to.toLowerCase()) || to.toLowerCase().includes(node.name.toLowerCase()),
  )

  if (!fromNode || !toNode || fromNode.id === toNode.id) {
    return null
  }

  // Dijkstra's algorithm implementation
  const distances: { [key: string]: number } = {}
  const fares: { [key: string]: number } = {}
  const times: { [key: string]: number } = {}
  const previous: { [key: string]: string | null } = {}
  const visited: Set<string> = new Set()
  const queue: string[] = []

  // Initialize distances
  ROUTE_NETWORK.forEach((node) => {
    distances[node.id] = node.id === fromNode.id ? 0 : Number.POSITIVE_INFINITY
    fares[node.id] = node.id === fromNode.id ? 0 : Number.POSITIVE_INFINITY
    times[node.id] = node.id === fromNode.id ? 0 : Number.POSITIVE_INFINITY
    previous[node.id] = null
    queue.push(node.id)
  })

  while (queue.length > 0) {
    // Find unvisited node with minimum cost
    const current = queue.reduce((min, nodeId) => {
      if (visited.has(nodeId)) return min
      const currentCost = optimizeFor === "time" ? times[nodeId] : fares[nodeId]
      const minCost = optimizeFor === "time" ? times[min] : fares[min]
      return currentCost < minCost ? nodeId : min
    })

    if (
      visited.has(current) ||
      (optimizeFor === "time" ? times[current] : fares[current]) === Number.POSITIVE_INFINITY
    ) {
      break
    }

    visited.add(current)
    const currentNode = ROUTE_NETWORK.find((n) => n.id === current)!

    // Update distances to neighbors
    currentNode.connections.forEach((connection) => {
      if (visited.has(connection.nodeId)) return

      const newDistance = distances[current] + connection.distance
      const newFare = fares[current] + connection.fare
      const newTime = times[current] + connection.time

      const shouldUpdate =
        optimizeFor === "time" ? newTime < times[connection.nodeId] : newFare < fares[connection.nodeId]

      if (shouldUpdate) {
        distances[connection.nodeId] = newDistance
        fares[connection.nodeId] = newFare
        times[connection.nodeId] = newTime
        previous[connection.nodeId] = current
      }
    })
  }

  // Reconstruct path
  const path: string[] = []
  let current: string | null = toNode.id

  while (current !== null) {
    const node = ROUTE_NETWORK.find((n) => n.id === current)!
    path.unshift(node.name)
    current = previous[current]
  }

  if (path[0] !== fromNode.name) {
    return null // No path found
  }

  return {
    path,
    totalDistance: Math.round(distances[toNode.id] * 10) / 10,
    totalFare: fares[toNode.id],
    totalTime: times[toNode.id],
    routeDetails: generateRouteDetails(path),
  }
}

function generateRouteDetails(path: string[]): string[] {
  const routeMap: { [key: string]: string } = {
    "Matina Aplaya - Agdao": "Via Matina Crossing, McArthur Highway",
    "Toril - Roxas Avenue": "Via Sirawan, Catalunan Grande, Ma-a Road",
    "Mintal - Roxas Avenue": "Via Tugbok District, Buhangin Road",
    "Ulas - Magsaysay Avenue": "Via Bunawan District, Lasang Road",
    "Sasa - JP Laurel Avenue": "Via Panacan, Sasa Port Area",
  }

  const details: string[] = []
  for (let i = 0; i < path.length - 1; i++) {
    const segment = `${path[i]} - ${path[i + 1]}`
    const reverseSegment = `${path[i + 1]} - ${path[i]}`

    if (routeMap[segment]) {
      details.push(routeMap[segment])
    } else if (routeMap[reverseSegment]) {
      details.push(routeMap[reverseSegment])
    } else {
      details.push(`Direct route via main roads`)
    }
  }

  return details
}

export const DAVAO_ROUTES_DATA = [
  {
    id: 1,
    routeNumber: "Route MA-AG",
    routeName: "Matina Aplaya - Agdao",
    destinations: ["Matina Aplaya", "Matina Crossing", "McArthur Highway", "Agdao Terminal"],
    fare: 15,
    distance: "8.5 km",
    estimatedTime: "20 mins",
    streets: ["Matina Aplaya Road", "McArthur Highway", "Agdao Bridge Road"],
    landmarks: ["Matina Town Square", "Davao Doctors Hospital", "Agdao Market"],
  },
  {
    id: 2,
    routeNumber: "Route TO-RX",
    routeName: "Toril - Roxas Avenue",
    destinations: ["Toril Terminal", "Sirawan", "Catalunan Grande", "Ma-a", "Roxas Avenue"],
    fare: 18,
    distance: "12.3 km",
    estimatedTime: "25 mins",
    streets: ["Toril-Sirawan Road", "Ma-a Road", "Catalunan Road", "Roxas Avenue"],
    landmarks: ["Toril Public Market", "Sirawan Bridge", "Ma-a Proper"],
  },
  {
    id: 3,
    routeNumber: "Route MI-RX",
    routeName: "Mintal - Roxas Avenue",
    destinations: ["Mintal Terminal", "Tugbok District", "Buhangin", "Roxas Avenue"],
    fare: 15,
    distance: "8.9 km",
    estimatedTime: "18 mins",
    streets: ["Mintal Road", "Tugbok-Buhangin Road", "Buhangin Highway", "Roxas Avenue"],
    landmarks: ["Mintal Proper", "Tugbok District Center", "Buhangin Market"],
  },
  {
    id: 4,
    routeNumber: "Route UL-MG",
    routeName: "Ulas - Magsaysay Avenue",
    destinations: ["Ulas Terminal", "Bunawan District", "Lasang", "Magsaysay Avenue"],
    fare: 15,
    distance: "7.4 km",
    estimatedTime: "16 mins",
    streets: ["Ulas Road", "Bunawan-Lasang Road", "Magsaysay Avenue"],
    landmarks: ["Ulas Proper", "Bunawan District Hall", "Lasang Bridge"],
  },
  {
    id: 5,
    routeNumber: "Route SA-JP",
    routeName: "Sasa via JP Laurel Avenue",
    destinations: ["Sasa Terminal", "Panacan", "JP Laurel Avenue", "Downtown"],
    fare: 12,
    distance: "6.1 km",
    estimatedTime: "14 mins",
    streets: ["Sasa Port Road", "Panacan Bridge", "JP Laurel Avenue", "Roxas Street"],
    landmarks: ["Sasa Port", "Panacan Bridge", "SM Lanang Premier"],
  },
]
