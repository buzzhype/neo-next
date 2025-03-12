// questionsData.js
// Comprehensive database of real estate questions and answers with artifact types

export const questionsData = [
  // Market Trends & Pricing Questions
  {
    id: "q1",
    category: "market",
    question:
      "What are the current real estate market trends in San Francisco?",
    answer:
      "The San Francisco real estate market is currently experiencing moderate growth with a 3.2% year-over-year increase in median home prices. We're seeing a shift toward more balanced conditions compared to the highly competitive seller's market of previous years. Inventory has increased by approximately 15%, giving buyers more options. The luxury market remains strong in premium neighborhoods, while more affordable areas are seeing increased buyer interest as remote work options have expanded geographic preferences.",
    artifactType: "chart",
    artifactData: {
      type: "line",
      title: "San Francisco Real Estate Trends (2020-2025)",
      xAxis: "Quarter",
      yAxis: "Median Price ($)",
      data: [
        { quarter: "Q1 2020", price: 1250000 },
        { quarter: "Q2 2020", price: 1220000 },
        { quarter: "Q3 2020", price: 1240000 },
        { quarter: "Q4 2020", price: 1265000 },
        { quarter: "Q1 2021", price: 1280000 },
        { quarter: "Q2 2021", price: 1310000 },
        { quarter: "Q3 2021", price: 1350000 },
        { quarter: "Q4 2021", price: 1395000 },
        { quarter: "Q1 2022", price: 1425000 },
        { quarter: "Q2 2022", price: 1450000 },
        { quarter: "Q3 2022", price: 1460000 },
        { quarter: "Q4 2022", price: 1445000 },
        { quarter: "Q1 2023", price: 1435000 },
        { quarter: "Q2 2023", price: 1450000 },
        { quarter: "Q3 2023", price: 1470000 },
        { quarter: "Q4 2023", price: 1490000 },
        { quarter: "Q1 2024", price: 1510000 },
        { quarter: "Q2 2024", price: 1535000 },
      ],
    },
  },
  {
    id: "q2",
    category: "market",
    question: "How much have home prices increased in the last year?",
    answer:
      "Over the past 12 months, home prices in the San Francisco Bay Area have increased by approximately 5.7% on average. However, this varies significantly by neighborhood. Premium areas like Pacific Heights and Noe Valley have seen increases of 7-8%, while more affordable neighborhoods like the Outer Sunset have experienced 3-4% growth. Condominiums have appreciated at a slightly lower rate (4.2%) compared to single-family homes (6.3%). This moderate but steady growth reflects a stabilizing market following the pandemic-related disruptions.",
    artifactType: "chart",
    artifactData: {
      type: "bar",
      title: "Year-over-Year Price Changes by Neighborhood",
      xAxis: "Neighborhood",
      yAxis: "Price Change (%)",
      data: [
        { neighborhood: "Pacific Heights", change: 7.8 },
        { neighborhood: "Noe Valley", change: 7.2 },
        { neighborhood: "Marina", change: 6.5 },
        { neighborhood: "Russian Hill", change: 6.1 },
        { neighborhood: "Mission District", change: 5.3 },
        { neighborhood: "Richmond", change: 4.6 },
        { neighborhood: "Bernal Heights", change: 4.2 },
        { neighborhood: "Outer Sunset", change: 3.8 },
      ],
    },
  },
  {
    id: "q3",
    category: "market",
    question: "Is now a good time to buy a house?",
    answer:
      "The current market presents a more balanced opportunity for buyers than we've seen in recent years. With interest rates stabilizing around 5.8% and inventory showing a 15% year-over-year increase, buyers have more options and slightly improved negotiating power. The pace of price growth has moderated to sustainable levels, reducing the pressure to make rushed decisions. That said, the San Francisco market remains fundamentally strong with limited land for new development, meaning well-priced properties in desirable locations continue to attract multiple offers. Your specific situation, including financial readiness, timeline, and neighborhood preferences will ultimately determine if now is the right time for you personally.",
    artifactType: "table",
    artifactData: {
      title: "Current Market Indicators for Buyers",
      columns: ["Indicator", "Status", "Trend", "Impact on Buyers"],
      rows: [
        [
          "Interest Rates",
          "5.8% (30-year fixed)",
          "Stabilizing",
          "Moderately favorable",
        ],
        ["Inventory Levels", "15% increase YoY", "Increasing", "More options"],
        ["Days on Market", "28 days (median)", "Increasing", "Less pressure"],
        [
          "Price Reductions",
          "22% of listings",
          "Increasing",
          "Better negotiating power",
        ],
        ["Bidding Wars", "32% of properties", "Decreasing", "Less competition"],
        [
          "Price-to-List Ratio",
          "98.5%",
          "Stabilizing",
          "More realistic pricing",
        ],
      ],
    },
  },

  // Neighborhood-specific Questions
  {
    id: "q4",
    category: "neighborhoods",
    question: "What are the best neighborhoods for families in San Francisco?",
    answer:
      "San Francisco offers several excellent neighborhoods for families, each with unique characteristics. Noe Valley is particularly popular for its central location, family-friendly atmosphere, and highly-rated schools like Alvarado Elementary. The Inner Sunset provides a quieter setting with proximity to Golden Gate Park and strong schools such as Alice Fong Yu. Forest Hill and West Portal offer more single-family homes with yards and a suburban feel while maintaining access to public transit. For families seeking more space, Bernal Heights provides a village-like atmosphere with stunning views and playgrounds, while St. Francis Wood offers larger homes and lots with a peaceful environment. These neighborhoods generally offer a combination of quality schools, parks, family-oriented businesses, and relative safety compared to other parts of the city.",
    artifactType: "map",
    artifactData: {
      title: "Top Family-Friendly Neighborhoods in San Francisco",
      centerLat: 37.7749,
      centerLng: -122.4194,
      zoom: 12,
      markers: [
        {
          name: "Noe Valley",
          lat: 37.7502,
          lng: -122.4337,
          schoolRating: 8.2,
          parkScore: 9.0,
          safetyScore: 8.5,
        },
        {
          name: "Inner Sunset",
          lat: 37.7601,
          lng: -122.4689,
          schoolRating: 8.5,
          parkScore: 9.5,
          safetyScore: 8.7,
        },
        {
          name: "West Portal",
          lat: 37.7405,
          lng: -122.4663,
          schoolRating: 8.7,
          parkScore: 7.8,
          safetyScore: 8.9,
        },
        {
          name: "Forest Hill",
          lat: 37.7464,
          lng: -122.4681,
          schoolRating: 9.0,
          parkScore: 8.5,
          safetyScore: 9.2,
        },
        {
          name: "Bernal Heights",
          lat: 37.7399,
          lng: -122.4166,
          schoolRating: 7.8,
          parkScore: 8.2,
          safetyScore: 8.0,
        },
        {
          name: "St. Francis Wood",
          lat: 37.7359,
          lng: -122.4664,
          schoolRating: 9.3,
          parkScore: 7.4,
          safetyScore: 9.5,
        },
      ],
    },
  },
  {
    id: "q5",
    category: "neighborhoods",
    question:
      "Which neighborhoods have the best access to public transportation?",
    answer:
      "San Francisco is well-known for its comprehensive public transportation system. Downtown/Financial District offers the best connectivity with access to BART, Muni Metro, cable cars, and numerous bus lines, making it ideal for commuters. The Mission District is served by two BART stations (16th & 24th Street) and multiple bus routes. SoMa provides excellent access to Caltrain, BART, and Muni lines. Hayes Valley and Lower Haight offer strategic locations with multiple Muni lines intersecting these neighborhoods. Nob Hill and Russian Hill, despite their challenging topography, are well-served by cable cars and bus routes. The Castro and Noe Valley are connected by the J-Church Muni Metro line and several bus routes. Each of these neighborhoods has a transit score above 85, with Downtown scoring a near-perfect 99.",
    artifactType: "map",
    artifactData: {
      title: "Transit Accessibility by Neighborhood",
      centerLat: 37.7749,
      centerLng: -122.4194,
      zoom: 13,
      heatmap: true,
      data: [
        {
          name: "Downtown/Financial District",
          lat: 37.7937,
          lng: -122.3996,
          transitScore: 99,
        },
        {
          name: "Mission District",
          lat: 37.7599,
          lng: -122.4148,
          transitScore: 94,
        },
        { name: "SoMa", lat: 37.7785, lng: -122.4056, transitScore: 92 },
        {
          name: "Hayes Valley",
          lat: 37.7759,
          lng: -122.4245,
          transitScore: 90,
        },
        {
          name: "Lower Haight",
          lat: 37.7726,
          lng: -122.4306,
          transitScore: 89,
        },
        { name: "Nob Hill", lat: 37.793, lng: -122.4161, transitScore: 87 },
        { name: "Castro", lat: 37.7609, lng: -122.435, transitScore: 86 },
        { name: "Noe Valley", lat: 37.7502, lng: -122.4337, transitScore: 85 },
        { name: "Russian Hill", lat: 37.801, lng: -122.418, transitScore: 85 },
        {
          name: "Potrero Hill",
          lat: 37.7605,
          lng: -122.4005,
          transitScore: 78,
        },
        {
          name: "Richmond District",
          lat: 37.7749,
          lng: -122.4769,
          transitScore: 75,
        },
        {
          name: "Sunset District",
          lat: 37.752,
          lng: -122.496,
          transitScore: 69,
        },
      ],
    },
  },
  {
    id: "q6",
    category: "neighborhoods",
    question: "What neighborhoods have the best restaurants and nightlife?",
    answer:
      "San Francisco is a food lover's paradise with several neighborhoods renowned for their culinary and nightlife scenes. The Mission District leads with its incredible diversity, from award-winning fine dining at places like Lazy Bear to authentic taquerias and trendy bars along Valencia Street. Hayes Valley has transformed into a gastronomic destination with upscale restaurants like Rich Table and Absinthe alongside cocktail bars and wine lounges. North Beach maintains its Italian heritage with iconic establishments while adding contemporary spots. The Marina caters to a younger crowd with bustling Chestnut Street, while SoMa offers larger venues including clubs and concert spaces. Chinatown provides authentic Asian cuisine, and the Castro combines its vibrant LGBTQ+ nightlife with an increasingly diverse restaurant scene.",
    artifactType: "table",
    artifactData: {
      title: "San Francisco's Top Food & Nightlife Neighborhoods",
      columns: [
        "Neighborhood",
        "Dining Score",
        "Nightlife Score",
        "Known For",
        "Notable Spots",
      ],
      rows: [
        [
          "Mission",
          9.8,
          9.5,
          "Diversity, Trendy spots",
          "Lazy Bear, Foreign Cinema, True Laurel",
        ],
        [
          "Hayes Valley",
          9.5,
          8.7,
          "Upscale dining, Wine bars",
          "Rich Table, Absinthe, Brass Tacks",
        ],
        [
          "North Beach",
          9.0,
          9.2,
          "Italian cuisine, Historic bars",
          "Tony's, Original Joe's, Vesuvio",
        ],
        [
          "Marina",
          8.5,
          9.4,
          "Young crowd, Brunch spots",
          "A16, Delarosa, The Dorian",
        ],
        [
          "SoMa",
          8.6,
          9.7,
          "Clubs, Breweries",
          "Coin-Op, 21st Amendment, DNA Lounge",
        ],
        [
          "Chinatown",
          9.4,
          7.2,
          "Authentic Asian cuisine",
          "Mister Jiu's, China Live, R&G Lounge",
        ],
        [
          "Castro",
          8.2,
          9.6,
          "LGBTQ+ venues, Diverse dining",
          "Frances, Hi Tops, Beaux",
        ],
      ],
    },
  },

  // First-Time Buyer Questions
  {
    id: "q7",
    category: "firstTimeBuyer",
    question: "What steps are involved in buying my first home?",
    answer:
      "Buying your first home involves several key steps. First, assess your finances and get pre-approved for a mortgage to understand your budget. Next, determine your needs and wants in a property and begin house hunting with a real estate agent. When you find a home you like, make an offer that includes earnest money to show your commitment. If accepted, conduct inspections to identify any issues. Your lender will require an appraisal to verify the property's value. Once all contingencies are met, you'll secure final mortgage approval, review closing documents, and complete the final walkthrough. At closing, you'll sign paperwork, pay closing costs, and receive your keys. Throughout this process, working with experienced professionals like a real estate agent, mortgage lender, and real estate attorney can make the journey smoother.",
    artifactType: "flowchart",
    artifactData: {
      title: "First-Time Home Buying Process",
      steps: [
        {
          id: 1,
          text: "Financial Assessment & Pre-Approval",
          description:
            "Determine your budget and get pre-approved for a mortgage",
        },
        {
          id: 2,
          text: "Define Home Requirements",
          description: "Create a list of needs and wants for your ideal home",
        },
        {
          id: 3,
          text: "Find a Real Estate Agent",
          description:
            "Partner with an experienced agent who knows your target areas",
        },
        {
          id: 4,
          text: "House Hunting",
          description: "Visit properties that match your criteria",
        },
        {
          id: 5,
          text: "Make an Offer",
          description: "Submit a competitive offer with earnest money deposit",
        },
        {
          id: 6,
          text: "Home Inspection",
          description:
            "Hire professionals to evaluate the property's condition",
        },
        {
          id: 7,
          text: "Appraisal",
          description:
            "Lender orders an appraisal to verify the property's value",
        },
        {
          id: 8,
          text: "Final Mortgage Approval",
          description: "Lender confirms all documentation is complete",
        },
        {
          id: 9,
          text: "Final Walkthrough",
          description: "Verify the property's condition before closing",
        },
        {
          id: 10,
          text: "Closing",
          description: "Sign documents, pay closing costs, receive keys",
        },
      ],
      connections: [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 8],
        [8, 9],
        [9, 10],
      ],
    },
  },
  {
    id: "q8",
    category: "firstTimeBuyer",
    question: "How much down payment do I need for a first home?",
    answer:
      "The down payment requirements vary depending on the loan type and your financial situation. Conventional loans typically require 3% to 20% down. If you put down less than 20%, you'll need to pay Private Mortgage Insurance (PMI). FHA loans require a minimum of 3.5% down if your credit score is 580 or higher, or 10% if your score is between 500-579. VA loans for eligible veterans and active military may offer 0% down payment options. USDA loans for rural properties also offer 0% down for qualified buyers. First-time homebuyer programs through state and local agencies may provide down payment assistance, often in the form of grants or low-interest loans. Keep in mind that a larger down payment can reduce your monthly mortgage payments and total interest paid over the life of the loan.",
    artifactType: "chart",
    artifactData: {
      type: "bar",
      title: "Down Payment Requirements by Loan Type",
      xAxis: "Loan Type",
      yAxis: "Minimum Down Payment (%)",
      data: [
        { loanType: "Conventional (with PMI)", percentage: 3 },
        { loanType: "Conventional (without PMI)", percentage: 20 },
        { loanType: "FHA (580+ credit)", percentage: 3.5 },
        { loanType: "FHA (500-579 credit)", percentage: 10 },
        { loanType: "VA Loan", percentage: 0 },
        { loanType: "USDA Loan", percentage: 0 },
      ],
    },
  },
  {
    id: "q9",
    category: "firstTimeBuyer",
    question: "What first-time homebuyer programs are available in California?",
    answer:
      "California offers several programs to help first-time homebuyers. The CalHFA MyHome Assistance Program provides a deferred-payment junior loan of up to 3.5% of the purchase price to help with down payment and closing costs. The CalHFA Zero Interest Program (ZIP) offers a 0% interest junior loan for closing costs of up to 3% of the loan amount. The California Dream For All program provides shared appreciation loans for up to 20% of a home's purchase price. The CalHFA FHA program combines an FHA loan with down payment assistance. Many local counties and cities offer additional programs, such as San Francisco's Down Payment Assistance Loan Program (DALP) which provides loans up to $375,000. These programs typically have income limits, require homebuyer education courses, and have specific property requirements, so it's important to check current eligibility criteria.",
    artifactType: "table",
    artifactData: {
      title: "California First-Time Homebuyer Programs",
      columns: [
        "Program",
        "Assistance Type",
        "Amount",
        "Income Limits",
        "Special Requirements",
      ],
      rows: [
        [
          "CalHFA MyHome",
          "Deferred junior loan",
          "Up to 3.5% of purchase price",
          "Varies by county",
          "Must complete homebuyer education",
        ],
        [
          "CalHFA ZIP",
          "Zero-interest junior loan",
          "Up to 3% of loan amount",
          "Varies by county",
          "For closing costs only",
        ],
        [
          "CA Dream For All",
          "Shared appreciation loan",
          "Up to 20% of purchase price",
          "150% of county AMI",
          "Shared equity when sold",
        ],
        [
          "CalHFA FHA",
          "FHA first mortgage with assistance",
          "Varies",
          "Varies by county",
          "FICO 660+ required",
        ],
        [
          "SF DALP",
          "Deferred loan",
          "Up to $375,000",
          "150% of SF AMI",
          "San Francisco only",
        ],
        [
          "CalVet Home Loans",
          "Competitive mortgage",
          "Varies",
          "None",
          "CA veterans only",
        ],
        [
          "Golden State Finance",
          "Down payment grant",
          "Up to 5% of loan amount",
          "Varies",
          "No repayment required",
        ],
      ],
    },
  },

  // Investment Properties
  {
    id: "q10",
    category: "investment",
    question:
      "What are the best neighborhoods for investment properties in San Francisco?",
    answer:
      "For investment properties in San Francisco, several neighborhoods stand out based on appreciation potential, rental demand, and yield. Bayview-Hunters Point is experiencing significant redevelopment with major projects underway, offering lower entry points and strong appreciation potential. The Excelsior and Visitacion Valley provide more affordable options with solid rental demand and improving amenities. SoMa and Mission Bay continue to benefit from tech industry growth and new development. For higher-end investments, Hayes Valley and Dogpatch offer strong appreciation with their trendy status and ongoing development. The Outer Sunset is gaining popularity with families and offers good value with rental appeal to students from nearby SFSU. Each area has different risk-reward profiles, with emerging neighborhoods offering higher potential returns but with greater uncertainty compared to established areas.",
    artifactType: "table",
    artifactData: {
      title: "Top Investment Neighborhoods in San Francisco",
      columns: [
        "Neighborhood",
        "Median Price",
        "Average Rent (2BR)",
        "Cap Rate",
        "5-Year Appreciation",
        "Investment Profile",
      ],
      rows: [
        [
          "Bayview-Hunters Point",
          "$985,000",
          "$3,250",
          "4.2%",
          "28%",
          "High potential, higher risk",
        ],
        [
          "Excelsior",
          "$1,150,000",
          "$3,400",
          "3.8%",
          "24%",
          "Moderate potential, moderate risk",
        ],
        [
          "Visitacion Valley",
          "$1,050,000",
          "$3,300",
          "4.0%",
          "25%",
          "Moderate potential, moderate risk",
        ],
        [
          "SoMa",
          "$1,250,000",
          "$4,200",
          "3.5%",
          "22%",
          "Steady growth, lower risk",
        ],
        [
          "Mission Bay",
          "$1,380,000",
          "$4,500",
          "3.3%",
          "20%",
          "Steady growth, lower risk",
        ],
        [
          "Hayes Valley",
          "$1,460,000",
          "$4,300",
          "3.0%",
          "18%",
          "Lower yield, lower risk",
        ],
        [
          "Dogpatch",
          "$1,350,000",
          "$4,100",
          "3.2%",
          "19%",
          "Trendy area, moderate risk",
        ],
        [
          "Outer Sunset",
          "$1,280,000",
          "$3,600",
          "3.6%",
          "21%",
          "Family-friendly, moderate risk",
        ],
      ],
    },
  },
  {
    id: "q11",
    category: "investment",
    question:
      "What's the average cap rate for rental properties in San Francisco?",
    answer:
      "Cap rates in San Francisco currently range from 2.5% to 4.5%, which is lower than many other US markets but typical for high-value coastal cities. The city-wide average is approximately 3.3% for residential rental properties. Multi-family properties tend to have slightly higher cap rates (3.5-4.5%) compared to single-family rentals (2.5-3.5%). Cap rates vary significantly by neighborhood, with more established affluent areas like Pacific Heights seeing rates as low as 2.5%, while emerging neighborhoods like Bayview can offer rates up to 4.5%. While these cap rates may seem low compared to other markets, San Francisco investors typically benefit from strong long-term appreciation, tax advantages, and relatively stable tenant demand. Many successful investors in this market focus more on long-term equity building rather than immediate cash flow.",
    artifactType: "chart",
    artifactData: {
      type: "bar",
      title: "Average Cap Rates by San Francisco Neighborhood",
      xAxis: "Neighborhood",
      yAxis: "Cap Rate (%)",
      data: [
        { neighborhood: "Bayview", capRate: 4.5 },
        { neighborhood: "Excelsior", capRate: 4.2 },
        { neighborhood: "Outer Mission", capRate: 4.0 },
        { neighborhood: "Ingleside", capRate: 3.9 },
        { neighborhood: "Outer Sunset", capRate: 3.7 },
        { neighborhood: "South Beach", capRate: 3.4 },
        { neighborhood: "Mission District", capRate: 3.3 },
        { neighborhood: "Noe Valley", capRate: 3.0 },
        { neighborhood: "Hayes Valley", capRate: 2.9 },
        { neighborhood: "Marina", capRate: 2.7 },
        { neighborhood: "Pacific Heights", capRate: 2.5 },
      ],
    },
  },
  {
    id: "q12",
    category: "investment",
    question:
      "Should I invest in single-family homes or multi-family properties?",
    answer:
      "The decision between single-family and multi-family properties depends on your investment goals, capital resources, and management preferences. Single-family homes in San Francisco typically offer lower maintenance, easier management, and potentially stronger appreciation in desirable neighborhoods. They're often easier to sell and may attract longer-term tenants. However, they present higher vacancy risk (100% vacant when empty) and generally lower cash flow yields (typically 2.5-3.5% cap rates). Multi-family properties provide diversified vacancy risk, better cash flow (3.5-4.5% cap rates), and economies of scale for maintenance and management. They offer the potential for value-add improvements and may qualify for commercial financing with better terms. However, they require more active management, have higher entry costs, and can be more difficult to sell. Your decision should align with your investment strategy, risk tolerance, and whether you're prioritizing appreciation or cash flow.",
    artifactType: "table",
    artifactData: {
      title: "Single-Family vs. Multi-Family Investment Comparison",
      columns: ["Factor", "Single-Family Homes", "Multi-Family Properties"],
      rows: [
        ["Entry Cost", "$1.2M-$3M+", "$2.5M-$10M+"],
        ["Cap Rate (Typical)", "2.5-3.5%", "3.5-4.5%"],
        ["Cash Flow", "Lower", "Higher"],
        [
          "Appreciation Potential",
          "Higher in premium areas",
          "Moderate, more consistent",
        ],
        ["Vacancy Risk", "High (all-or-nothing)", "Diversified"],
        ["Management Complexity", "Lower", "Higher"],
        [
          "Maintenance Costs",
          "Varies by property age",
          "More predictable, economies of scale",
        ],
        [
          "Financing Options",
          "Residential loans, lower rates",
          "Commercial loans, better terms",
        ],
        [
          "Tenant Quality",
          "Often longer-term",
          "More turnover, varies by unit",
        ],
        ["Exit Strategy", "Easier to sell", "Smaller buyer pool"],
        ["Value-Add Potential", "Limited", "Higher through optimization"],
      ],
    },
  },

  // Mortgage & Financing
  {
    id: "q13",
    category: "mortgage",
    question: "What are the current mortgage interest rates in California?",
    answer:
      "Current mortgage rates in California average around 5.8% for a 30-year fixed-rate mortgage and 5.1% for a 15-year fixed-rate. These rates can vary based on several factors, including your credit score, loan-to-value ratio, property type, and loan amount. Jumbo loans (over $726,200 in San Francisco County) may have slightly higher or lower rates depending on the lender. Adjustable-rate mortgages (ARMs) currently offer initial rates around 4.9% for a 5/1 ARM, providing lower initial payments but with rate variability after the fixed period. Interest rates have stabilized somewhat after the increases seen in 2023, though they remain significantly higher than the historic lows of 2020-2021. For the most competitive rates, maintaining a credit score above 740, making a down payment of 20% or more, and shopping among multiple lenders is recommended.",
    artifactType: "chart",
    artifactData: {
      type: "line",
      title: "Mortgage Rate Trends in California (2020-2025)",
      xAxis: "Month",
      yAxis: "Interest Rate (%)",
      dataSets: [
        {
          name: "30-Year Fixed",
          data: [
            { month: "Jan 2020", rate: 3.7 },
            { month: "Jul 2020", rate: 3.0 },
            { month: "Jan 2021", rate: 2.7 },
            { month: "Jul 2021", rate: 2.9 },
            { month: "Jan 2022", rate: 3.5 },
            { month: "Jul 2022", rate: 5.3 },
            { month: "Jan 2023", rate: 6.2 },
            { month: "Jul 2023", rate: 6.5 },
            { month: "Jan 2024", rate: 6.0 },
            { month: "Jul 2024", rate: 5.8 },
          ],
        },
        {
          name: "15-Year Fixed",
          data: [
            { month: "Jan 2020", rate: 3.2 },
            { month: "Jul 2020", rate: 2.5 },
            { month: "Jan 2021", rate: 2.2 },
            { month: "Jul 2021", rate: 2.4 },
            { month: "Jan 2022", rate: 2.8 },
            { month: "Jul 2022", rate: 4.6 },
            { month: "Jan 2023", rate: 5.4 },
            { month: "Jul 2023", rate: 5.7 },
            { month: "Jan 2024", rate: 5.3 },
            { month: "Jul 2024", rate: 5.1 },
          ],
        },
        {
          name: "5/1 ARM",
          data: [
            { month: "Jan 2020", rate: 3.3 },
            { month: "Jul 2020", rate: 2.7 },
            { month: "Jan 2021", rate: 2.5 },
            { month: "Jul 2021", rate: 2.6 },
            { month: "Jan 2022", rate: 2.7 },
            { month: "Jul 2022", rate: 4.3 },
            { month: "Jan 2023", rate: 5.2 },
            { month: "Jul 2023", rate: 5.5 },
            { month: "Jan 2024", rate: 5.1 },
            { month: "Jul 2024", rate: 4.9 },
          ],
        },
      ],
    },
  },
  {
    id: "q14",
    category: "mortgage",
    question: "How do I qualify for a jumbo loan in San Francisco?",
    answer:
      "Qualifying for a jumbo loan in San Francisco (loans exceeding $726,200 for 2024) is more stringent than for conventional loans. Typically, you'll need a credit score of at least 700, though 720+ is preferred for the best rates. Most lenders require a debt-to-income ratio below 43%, with some premium lenders preferring under 38%. Down payment requirements are higher, usually 20% minimum, with some lenders requiring 25-30% for larger loan amounts. You'll need to demonstrate substantial cash reserves, often 6-12 months of mortgage payments (including taxes and insurance). Income verification is rigorous, requiring two years of tax returns, W-2s, and recent pay stubs. Self-employed borrowers face additional scrutiny. The property will undergo a thorough appraisal, potentially including a second opinion for high-value homes. Shopping around is crucial as jumbo loan terms and requirements vary significantly between lenders, with some offering more favorable terms for high-net-worth clients.",
    artifactType: "table",
    artifactData: {
      title: "Jumbo Loan Requirements in San Francisco",
      columns: [
        "Requirement",
        "Typical Minimum",
        "Preferred for Best Rates",
        "Notes",
      ],
      rows: [
        [
          "Loan Amount",
          "$726,201+",
          "Varies",
          "2024 conforming limit for SF County",
        ],
        ["Credit Score", "700", "740+", "Some premium lenders require 760+"],
        ["Down Payment", "20%", "25-30%", "Higher for $2M+ loans"],
        [
          "Debt-to-Income Ratio",
          "43%",
          "36-38%",
          "Lower DTI preferred for larger loans",
        ],
        [
          "Cash Reserves",
          "6 months",
          "12+ months",
          "All mortgage obligations plus expenses",
        ],
        [
          "Income Documentation",
          "2 years",
          "2+ years",
          "More scrutiny for variable income",
        ],
        [
          "Employment History",
          "2 years",
          "2+ years in same field",
          "Stability highly valued",
        ],
        [
          "Property Types",
          "SFR, condos, townhomes",
          "Single-family preferred",
          "Higher requirements for condos/co-ops",
        ],
        [
          "Second Appraisal",
          "Sometimes",
          "Likely for $1.5M+",
          "Additional cost to borrower",
        ],
      ],
    },
  },
  {
    id: "q15",
    category: "mortgage",
    question: "Should I choose a fixed-rate or adjustable-rate mortgage?",
    answer:
      "The choice between fixed-rate and adjustable-rate mortgages depends on your financial situation and how long you plan to stay in the home. Fixed-rate mortgages (currently averaging 5.8% for 30-year terms) offer predictability with the same interest rate and monthly payment for the entire loan term, making budgeting simpler and protecting against rising rates. They're ideal if you plan to stay in your home long-term or value payment stability. Adjustable-rate mortgages (ARMs) start with lower interest rates (currently around 4.9% for 5/1 ARMs) that remain fixed for an initial period (typically 3, 5, 7, or 10 years) before adjusting periodically. They can save you money initially but introduce uncertainty after the fixed period. ARMs might be advantageous if you plan to move or refinance before the rate adjusts, want lower initial payments to qualify for a larger loan, or believe interest rates will decrease. Consider your risk tolerance, length of expected homeownership, and current rate environment when deciding.",
    artifactType: "chart",
    artifactData: {
      type: "comparison",
      title: "Fixed-Rate vs. ARM Comparison",
      scenario: {
        loanAmount: 800000,
        term: 30,
        fixedRate: 5.8,
        armInitialRate: 4.9,
        armAdjustmentPeriod: 5,
        potentialArmRateAfterAdjustment: [5.9, 6.9, 7.9],
      },
      results: [
        {
          label: "30-Year Fixed",
          initialMonthlyPayment: 4707,
          paymentYear10: 4707,
          totalInterestYear10: 433305,
          totalInterestFull: 894471,
        },
        {
          label: "5/1 ARM (if rate adjusts to 5.9%)",
          initialMonthlyPayment: 4244,
          paymentYear10: 4849,
          totalInterestYear10: 410162,
          totalInterestFull: 932713,
        },
        {
          label: "5/1 ARM (if rate adjusts to 6.9%)",
          initialMonthlyPayment: 4244,
          paymentYear10: 5320,
          totalInterestYear10: 410162,
          totalInterestFull: 1101643,
        },
        {
          label: "5/1 ARM (if rate adjusts to 7.9%)",
          initialMonthlyPayment: 4244,
          paymentYear10: 5806,
          totalInterestYear10: 410162,
          totalInterestFull: 1274102,
        },
      ],
    },
  },

  // Home Buying Process
  {
    id: "q16",
    category: "process",
    question:
      "How long does it typically take to close on a house in San Francisco?",
    answer:
      "In San Francisco, the closing process typically takes 30-45 days from accepted offer to final closing, though this timeline can vary based on several factors. The financing method significantly impacts the timeline, with cash purchases potentially closing in as little as 7-14 days, while financed purchases generally take longer. Conventional loans usually require 30-35 days, while FHA and VA loans might take 35-45 days due to additional requirements. The property type also influences timing, with single-family homes generally closing faster than condos, which may require HOA document reviews. The escrow process includes multiple milestones such as home inspections (typically completed within the first week), appraisal (1-2 weeks), loan processing and underwriting (2-3 weeks), and final loan approval (1 week before closing). Market conditions can also impact timelines, with busy periods potentially extending the process. Working with experienced local professionals who understand San Francisco's unique market can help ensure a smoother and more predictable closing process.",
    artifactType: "timeline",
    artifactData: {
      title: "Typical San Francisco Home Closing Timeline",
      steps: [
        {
          day: 1,
          event: "Offer Accepted",
          description:
            "Purchase agreement signed, escrow opened, earnest money deposited",
        },
        {
          day: 3,
          event: "Preliminary Title Report",
          description: "Title company researches property history",
        },
        {
          day: 5,
          event: "Home Inspection",
          description: "General inspection of property condition",
        },
        {
          day: 7,
          event: "Specialized Inspections",
          description: "Pest, roof, foundation inspections as needed",
        },
        {
          day: 10,
          event: "Inspection Contingency Removal",
          description: "Buyer accepts property condition or requests repairs",
        },
        {
          day: 12,
          event: "Appraisal Ordered",
          description: "Lender orders property appraisal",
        },
        {
          day: 18,
          event: "Appraisal Completed",
          description: "Property value assessed for lender",
        },
        {
          day: 21,
          event: "Loan Processing",
          description: "Lender processes application and documentation",
        },
        {
          day: 28,
          event: "Loan Approval",
          description: "Final loan approval issued by lender",
        },
        {
          day: 30,
          event: "Closing Disclosure",
          description: "Final closing costs and terms provided to buyer",
        },
        {
          day: 33,
          event: "Final Walkthrough",
          description: "Buyer verifies property condition before closing",
        },
        {
          day: 35,
          event: "Closing Day",
          description: "Signing of documents, funding, and recording of deed",
        },
        {
          day: 36,
          event: "Keys Handed Over",
          description: "Buyer takes possession of property",
        },
      ],
    },
  },
  {
    id: "q17",
    category: "process",
    question: "What closing costs should I expect when buying a home?",
    answer:
      "When buying a home in San Francisco, closing costs typically range from 2-5% of the purchase price. For a $1.5 million property, that's approximately $30,000-$75,000 in addition to your down payment. Major costs include loan origination fees (0.5-1% of loan amount), appraisal fees ($500-$750), title insurance ($3,000-$7,000 for San Francisco properties), escrow fees ($2,000-$3,000), and recording fees (approximately $100-$200). You'll also pay prepaid expenses such as property taxes (typically 2-6 months in advance), homeowners insurance premiums (12 months upfront), and mortgage interest from closing until the first regular payment. San Francisco also has a transfer tax of $6.80 per $1,000 of property value (for properties over $250,000), though this is traditionally paid by the seller. Additional costs may include homeowners association (HOA) dues for condos, home warranty premiums, and natural hazard disclosure reports. Your lender will provide a Loan Estimate within three days of your application and a Closing Disclosure at least three days before closing detailing all costs.",
    artifactType: "chart",
    artifactData: {
      type: "pie",
      title: "Typical Closing Costs Breakdown for $1.5M San Francisco Home",
      data: [
        {
          category: "Loan Costs",
          value: 15000,
          description: "Origination fees, points, application fees",
        },
        {
          category: "Title Insurance",
          value: 5000,
          description: "Protection against property ownership issues",
        },
        {
          category: "Escrow Fees",
          value: 2500,
          description: "Third-party handling of transaction funds",
        },
        {
          category: "Appraisal",
          value: 750,
          description: "Professional property valuation",
        },
        {
          category: "Prepaid Property Taxes",
          value: 9375,
          description: "6 months of property taxes in advance",
        },
        {
          category: "Prepaid Insurance",
          value: 2500,
          description: "12 months of homeowners insurance",
        },
        {
          category: "Prepaid Interest",
          value: 2000,
          description: "Interest from closing to first payment",
        },
        {
          category: "Recording Fees",
          value: 150,
          description: "Government fees for recording documents",
        },
        {
          category: "Inspection Fees",
          value: 1200,
          description: "Home, pest, specialized inspections",
        },
        {
          category: "Other Costs",
          value: 1525,
          description: "HOA fees, home warranty, reports",
        },
      ],
      total: 40000,
    },
  },
  {
    id: "q18",
    category: "process",
    question: "How do I make a competitive offer in San Francisco's market?",
    answer:
      "In San Francisco's competitive market, making a standout offer requires strategic preparation. Begin with a strong financial foundation by securing a pre-approval letter from a reputable local lender, which demonstrates your ability to close. Consider offering 3-5% earnest money to show serious commitment. While purchase price is critical, also evaluate contingency periods and terms. Consider shortened inspection (5-7 days) and financing (14-21 days) contingencies if possible. In highly competitive situations, waiving contingencies might be necessary, though this carries risk. A personal letter to sellers (where permitted) explaining your connection to the property can sometimes differentiate your offer. If you're comfortable, consider an escalation clause that automatically increases your offer up to a maximum amount if other higher bids are received. Working with an experienced local agent who has strong relationships with listing agents can provide valuable insights on seller preferences and help craft the most appealing offer for each specific situation.",
    artifactType: "checklist",
    artifactData: {
      title: "San Francisco Competitive Offer Checklist",
      items: [
        {
          category: "Financial Preparation",
          tasks: [
            {
              task: "Secure a strong pre-approval from a reputable local lender",
              essential: true,
            },
            {
              task: "Be prepared for a down payment of 20-25% (or more in luxury markets)",
              essential: true,
            },
            {
              task: "Offer 3-5% earnest money deposit (higher than typical 1-3%)",
              recommended: true,
            },
            {
              task: "Consider proof of funds documentation for down payment and reserves",
              recommended: true,
            },
          ],
        },
        {
          category: "Offer Terms",
          tasks: [
            {
              task: "Offer at or above asking price based on comparable sales",
              essential: true,
            },
            {
              task: "Consider an escalation clause for highly competitive properties",
              recommended: false,
            },
            {
              task: "Align closing timeline with seller preferences",
              essential: true,
            },
            {
              task: "Offer free rent-back if seller needs time after closing",
              recommended: false,
            },
          ],
        },
        {
          category: "Contingencies",
          tasks: [
            {
              task: "Shorten inspection contingency to 5-7 days (vs. standard 10-17)",
              recommended: true,
            },
            {
              task: "Shorten financing contingency to 14-21 days (vs. standard 21-30)",
              recommended: true,
            },
            {
              task: "Consider waiving appraisal contingency if you have additional funds",
              recommended: false,
            },
            {
              task: "Consider pre-inspections before making offer",
              recommended: true,
            },
          ],
        },
        {
          category: "Strategic Additions",
          tasks: [
            {
              task: "Include personal letter to seller (where legally permitted)",
              recommended: false,
            },
            {
              task: "Use local lender familiar with SF market",
              essential: true,
            },
            {
              task: "Ensure real estate agent calls listing agent to understand seller priorities",
              essential: true,
            },
            {
              task: "Consider offering to cover seller closing costs",
              recommended: false,
            },
          ],
        },
      ],
    },
  },

  // Property-specific Questions
  {
    id: "q19",
    category: "property",
    question: "What should I look for during a home inspection?",
    answer:
      "During a home inspection in San Francisco, pay special attention to several key areas given the city's unique housing stock and environmental factors. Foundation issues are particularly important due to the city's seismic activity and hilly terrain—look for cracks, sloping floors, or doors that don't close properly. Given the city's fog and moisture, inspect for water damage and mold, especially in older homes with original windows or in basement areas. Electrical systems in historic homes often need updating, so check for outdated knob-and-tube wiring, inadequate service panels, or aluminum wiring. San Francisco's older housing stock may contain lead paint (pre-1978) and asbestos insulation. Roof condition is critical due to winter rains, with particular attention to proper drainage on flat roofs common in many neighborhoods. Plumbing should be checked for galvanized pipes that may need replacement. For multi-unit buildings, evaluate shared utilities and building systems. Beyond the standard inspection, consider specialized inspections for seismic safety, drainage, or chimney condition in older properties.",
    artifactType: "checklist",
    artifactData: {
      title: "San Francisco Home Inspection Checklist",
      categories: [
        {
          name: "Foundation & Structure",
          items: [
            {
              item: "Check for foundation cracks or movement",
              critical: true,
              sfSpecific: true,
            },
            {
              item: "Look for sloping floors or uneven surfaces",
              critical: true,
              sfSpecific: true,
            },
            {
              item: "Inspect for proper seismic retrofitting",
              critical: true,
              sfSpecific: true,
            },
            {
              item: "Examine foundation bolting and bracing",
              critical: true,
              sfSpecific: true,
            },
            {
              item: "Look for evidence of settling or sinkholes",
              critical: false,
              sfSpecific: true,
            },
          ],
        },
        {
          name: "Water Issues & Moisture",
          items: [
            {
              item: "Check for water intrusion in basement/lower levels",
              critical: true,
              sfSpecific: true,
            },
            {
              item: "Inspect for mold, especially in foggy neighborhoods",
              critical: true,
              sfSpecific: true,
            },
            {
              item: "Examine drainage systems and gutters",
              critical: true,
              sfSpecific: false,
            },
            {
              item: "Look for signs of water damage on ceilings/walls",
              critical: true,
              sfSpecific: false,
            },
            {
              item: "Check window seals and weatherproofing",
              critical: false,
              sfSpecific: true,
            },
          ],
        },
        {
          name: "Electrical System",
          items: [
            {
              item: "Identify outdated knob-and-tube wiring",
              critical: true,
              sfSpecific: true,
            },
            {
              item: "Ensure adequate electrical service (100A minimum)",
              critical: true,
              sfSpecific: false,
            },
            {
              item: "Look for aluminum wiring (fire hazard)",
              critical: true,
              sfSpecific: false,
            },
            {
              item: "Check GFCI outlets in kitchens/bathrooms",
              critical: false,
              sfSpecific: false,
            },
            {
              item: "Ensure proper grounding throughout",
              critical: false,
              sfSpecific: false,
            },
          ],
        },
        {
          name: "Plumbing",
          items: [
            {
              item: "Identify galvanized pipes that may need replacement",
              critical: true,
              sfSpecific: true,
            },
            {
              item: "Check water pressure and drainage",
              critical: false,
              sfSpecific: false,
            },
            {
              item: "Inspect for leaks under sinks and fixtures",
              critical: false,
              sfSpecific: false,
            },
            {
              item: "Examine sewer lateral condition",
              critical: true,
              sfSpecific: true,
            },
            {
              item: "Test water heater (age, capacity, seismic strapping)",
              critical: false,
              sfSpecific: true,
            },
          ],
        },
        {
          name: "Roof & Exterior",
          items: [
            {
              item: "Check flat roof membrane and drainage",
              critical: true,
              sfSpecific: true,
            },
            {
              item: "Inspect for proper flashing around chimneys/vents",
              critical: true,
              sfSpecific: false,
            },
            {
              item: "Look for deterioration of Victorian exterior details",
              critical: false,
              sfSpecific: true,
            },
            {
              item: "Examine stucco for cracks or damage",
              critical: false,
              sfSpecific: true,
            },
            {
              item: "Check deck waterproofing and structural integrity",
              critical: true,
              sfSpecific: true,
            },
          ],
        },
      ],
    },
  },
  {
    id: "q20",
    category: "property",
    question:
      "What's the difference between condo, TIC, and single-family homes in SF?",
    answer:
      "San Francisco offers three main residential property types, each with distinct characteristics. Single-family homes provide complete ownership of both the building and land. You have maximum control over your property, no HOA fees, and potentially stronger appreciation, but with higher purchase prices and full responsibility for all maintenance. Condominiums involve individual ownership of your unit's interior space plus an undivided interest in common areas. Condos typically offer lower maintenance responsibilities, amenities, and entry prices, but include monthly HOA fees, potential special assessments, and less privacy. Tenancy-in-Common (TIC) properties are unique to San Francisco and involve sharing ownership of the entire building with other TIC owners. TICs usually offer lower purchase prices (10-20% below comparable condos) but have significant drawbacks: they generally require specialized TIC loans with higher interest rates, face more complex resale processes, and may involve group decision-making for building matters. The choice depends on your budget, lifestyle preferences, maintenance willingness, and financial priorities.",
    artifactType: "comparison",
    artifactData: {
      title: "Property Types in San Francisco Comparison",
      items: [
        {
          type: "Single-Family Home",
          pricing: "Highest entry price, strongest appreciation potential",
          ownership: "Fee simple ownership of building and land",
          financing:
            "Traditional mortgages, best rates, conforming and jumbo available",
          maintenanceResponsibility:
            "Owner responsible for all maintenance and repairs",
          monthlyExpenses: "No HOA fees, highest property taxes",
          advantages: [
            "Complete control over property",
            "No shared walls or HOA restrictions",
            "Potentially stronger appreciation",
            "Better privacy and outdoor space options",
          ],
          disadvantages: [
            "Highest entry cost in SF market",
            "Full maintenance responsibility",
            "Higher property taxes",
            "Limited inventory in many neighborhoods",
          ],
          typicalBuyer: "Families, luxury buyers, long-term investors",
          resaleConsiderations: "Easiest to sell, broadest buyer pool",
        },
        {
          type: "Condominium",
          pricing: "Lower than single-family, higher than TIC",
          ownership:
            "Fee simple ownership of unit interior plus undivided interest in common areas",
          financing: "Traditional mortgages, slightly higher rates than SFH",
          maintenanceResponsibility:
            "Interior: unit owner; Exterior/common areas: HOA",
          monthlyExpenses: "HOA fees ($400-$1,200+ monthly), property taxes",
          advantages: [
            "Lower purchase price than single-family homes",
            "Reduced maintenance responsibilities",
            "Amenities in many buildings",
            "Strong resale potential",
          ],
          disadvantages: [
            "Monthly HOA fees",
            "Potential special assessments",
            "Less privacy",
            "HOA rules may restrict rentals or renovations",
          ],
          typicalBuyer: "First-time buyers, downsizers, investors",
          resaleConsiderations:
            "Generally strong market, HOA quality impacts value",
        },
        {
          type: "Tenancy-in-Common (TIC)",
          pricing: "Lowest entry price (10-20% below comparable condos)",
          ownership:
            "Fractional ownership of entire building, usage rights to specific unit",
          financing:
            "Specialized TIC loans, higher rates, limited lender options",
          maintenanceResponsibility:
            "Shared responsibility based on TIC agreement",
          monthlyExpenses:
            "HOA-like fees, property taxes, higher loan payments",
          advantages: [
            "Lowest purchase price",
            "Entry to desirable neighborhoods at lower cost",
            "Potential for condo conversion in some buildings",
            "Similar living experience to condos",
          ],
          disadvantages: [
            "Higher interest rates",
            "Smaller buyer pool when selling",
            "Group financing risk in some structures",
            "Complex governance structure",
          ],
          typicalBuyer:
            "First-time buyers seeking entry to market, risk-tolerant buyers",
          resaleConsiderations:
            "Limited buyer pool, longer selling times, conversion potential impacts value",
        },
      ],
    },
  },
  {
    id: "q21",
    category: "property",
    question: "Should I buy a fixer-upper or move-in ready home?",
    answer:
      "The decision between a fixer-upper and a move-in ready home depends on your budget, timeline, risk tolerance, and personal preferences. In San Francisco, fixer-uppers typically sell for 15-25% below comparable renovated properties but require significant investment to update. They offer potential for building equity through forced appreciation, customization to your taste, and potentially accessing neighborhoods otherwise out of your price range. However, renovations in San Francisco involve unique challenges: strict permitting processes that can take 6-18 months for major projects, contractor shortages causing delays, and renovation costs averaging $300-$500+ per square foot. Additionally, many SF fixer-uppers are older properties that may reveal unexpected issues during renovation. Move-in ready homes offer convenience, predictable costs, immediate enjoyment, and often include modern energy-efficient features, but come at a premium price with less opportunity for customization. Your decision should consider financial factors (purchase budget vs. renovation budget), timeline flexibility, renovation experience, stress tolerance, and how long you plan to own the property.",
    artifactType: "comparison",
    artifactData: {
      title: "Fixer-Upper vs. Move-In Ready in San Francisco",
      scenario: {
        neighborhoodExample: "Bernal Heights",
        fixerUpperPrice: "$1,250,000",
        moveInReadyPrice: "$1,650,000",
        propertyDetails: "3BR/2BA, 1,800 sq ft Victorian",
      },
      comparison: [
        {
          category: "Financial Considerations",
          fixerUpper: {
            initialCost: "$1,250,000 purchase",
            renovationCost: "$360,000-$540,000 ($200-$300/sq ft)",
            totalInvestment: "$1,610,000-$1,790,000",
            financingComplexity: "Requires renovation loan or substantial cash",
            potentialEquityGain:
              "Potentially $100,000-$250,000 with smart renovations",
          },
          moveInReady: {
            initialCost: "$1,650,000 purchase",
            renovationCost: "$0 (minor personalization only)",
            totalInvestment: "$1,650,000",
            financingComplexity: "Standard mortgage process",
            potentialEquityGain: "Limited to market appreciation only",
          },
        },
        {
          category: "Timeline & Process",
          fixerUpper: {
            moveInTimeline: "6-18+ months after purchase (depending on scope)",
            permitProcess: "3-12+ months for major renovations",
            constructionPeriod: "3-6+ months (often longer in SF)",
            stressLevel: "High - managing contractors, permits, decisions",
            unexpectedIssues: "High probability with SF's older housing stock",
          },
          moveInReady: {
            moveInTimeline: "30-45 days (standard closing period)",
            permitProcess: "None required immediately",
            constructionPeriod: "None required immediately",
            stressLevel: "Low - standard purchase process only",
            unexpectedIssues: "Low probability initially",
          },
        },
        {
          category: "Property Considerations",
          fixerUpper: {
            customization: "High - design to your specifications",
            energyEfficiency:
              "Can incorporate modern systems during renovation",
            historicalFeatures:
              "Opportunity to preserve/restore character elements",
            layoutOptions: "Potential to reconfigure to modern preferences",
            outdoorSpace: "Potential to optimize during renovation",
          },
          moveInReady: {
            customization: "Low - accept previous owner's choices",
            energyEfficiency: "Depends on recent renovations",
            historicalFeatures: "May have been removed in previous renovations",
            layoutOptions: "Fixed unless undertaking new renovation",
            outdoorSpace: "As-is condition",
          },
        },
      ],
      bestFor: {
        fixerUpper: [
          "Buyers with renovation experience",
          "Those with flexible timelines",
          "Design-oriented buyers seeking customization",
          "Investors focused on forced appreciation",
          "Buyers willing to trade time/stress for potential equity",
        ],
        moveInReady: [
          "First-time homebuyers",
          "Busy professionals with limited time",
          "Families needing immediate stability",
          "Buyers with limited tolerance for uncertainty",
          "Those without additional renovation budget",
        ],
      },
    },
  },

  // Legal & Regulatory
  {
    id: "q22",
    category: "legal",
    question:
      "What are the disclosure requirements when selling a home in California?",
    answer:
      "California has among the most comprehensive seller disclosure requirements in the nation. Sellers must complete a Transfer Disclosure Statement (TDS) detailing known property defects, neighborhood noise issues, past damage, and material facts affecting value. The Natural Hazard Disclosure Statement (NHD) identifies if the property is in earthquake fault zones, flood hazards, fire hazard areas, or other designated hazard zones. Additionally, sellers must disclose the presence of lead-based paint in homes built before 1978, provide a Megan's Law database disclosure, and report deaths on the property within the past three years. San Francisco has additional local requirements, including a 3R Report showing permit history, seismic hazard disclosures, and energy and water conservation compliance. Sellers must disclose neighborhood nuisances, pending special assessments, HOA information for condos/TICs, and rent control status for multi-unit buildings. These disclosures must be made in good faith, and failure to disclose known issues can result in liability for the seller, including potential lawsuits for fraudulent concealment or misrepresentation.",
    artifactType: "checklist",
    artifactData: {
      title: "California & San Francisco Seller Disclosure Requirements",
      categories: [
        {
          name: "State-Required Disclosures",
          items: [
            {
              disclosure: "Transfer Disclosure Statement (TDS)",
              required: true,
              details:
                "Comprehensive form covering property condition, defects, systems",
            },
            {
              disclosure: "Natural Hazard Disclosure Statement (NHD)",
              required: true,
              details:
                "Flood, fire, earthquake zones, special assessment districts",
            },
            {
              disclosure: "Lead-Based Paint Disclosure",
              required: true,
              details: "For all homes built before 1978",
            },
            {
              disclosure: "Megan's Law Database Disclosure",
              required: true,
              details: "Information about registered sex offenders database",
            },
            {
              disclosure: "Death on the Property Disclosure",
              required: true,
              details:
                "Any death on property within last 3 years (HIV/AIDS exempted)",
            },
            {
              disclosure: "Military Ordnance Disclosure",
              required: true,
              details:
                "If property is within 1 mile of former military training ground",
            },
            {
              disclosure: "Window Security Bars Disclosure",
              required: true,
              details:
                "If property has security bars with safety release mechanisms",
            },
            {
              disclosure: "Methamphetamine Contamination Disclosure",
              required: true,
              details: "If property was used for meth production",
            },
            {
              disclosure: "Environmental Hazards Booklet",
              required: true,
              details: "Information on common environmental hazards",
            },
          ],
        },
        {
          name: "San Francisco Specific Disclosures",
          items: [
            {
              disclosure: "3R Report",
              required: true,
              details:
                "Report of Residential Building Record showing permit history",
            },
            {
              disclosure: "Seismic Hazard Disclosure",
              required: true,
              details: "Geologic/liquefaction zones and retrofit requirements",
            },
            {
              disclosure: "Energy and Water Conservation Compliance",
              required: true,
              details: "Property meets water/energy conservation ordinances",
            },
            {
              disclosure: "Underground Storage Tank Disclosure",
              required: true,
              details: "If property has or had underground storage tanks",
            },
            {
              disclosure: "Soft-Story Retrofit Compliance",
              required: true,
              details: "For buildings with 5+ units requiring seismic upgrades",
            },
            {
              disclosure: "San Francisco Right of First Refusal",
              required: true,
              details: "For multi-unit buildings",
            },
            {
              disclosure: "Vacant Unit Disclosure",
              required: true,
              details:
                "If multi-unit building has vacant units and restrictions",
            },
          ],
        },
        {
          name: "Property-Specific Disclosures",
          items: [
            {
              disclosure: "Homeowners Association Documents",
              required: true,
              details: "For condos/TICs: CC&Rs, bylaws, financials, minutes",
            },
            {
              disclosure: "Condominium Disclosures",
              required: true,
              details: "Special assessments, defect litigation, reserves",
            },
            {
              disclosure: "Pest Control Inspection Report",
              required: false,
              details: "Not legally required but customary in SF",
            },
            {
              disclosure: "Rent Control Status",
              required: true,
              details:
                "For multi-unit buildings, current rents, tenancy details",
            },
            {
              disclosure: "Smoke/Carbon Monoxide Detector Compliance",
              required: true,
              details: "Statement of compliance with detector requirements",
            },
            {
              disclosure: "Water Heater Bracing Compliance",
              required: true,
              details: "Statement of compliance with seismic bracing",
            },
          ],
        },
      ],
    },
  },
  {
    id: "q23",
    category: "legal",
    question: "What are the rent control laws in San Francisco?",
    answer:
      "San Francisco has extensive rent control regulations administered by the San Francisco Rent Board. Rent control applies to most buildings constructed before June 1979, covering approximately 70% of the city's rental units. For these properties, annual rent increases are limited to 60% of the Consumer Price Index (CPI), which typically ranges from 1-3% annually. The city also has strict just cause eviction protections, meaning landlords can only evict tenants for specific reasons outlined in the ordinance, such as non-payment of rent, breach of lease terms, owner move-in, or Ellis Act withdrawals. Newer buildings (post-June 1979) are exempt from rent control but still subject to just cause eviction requirements under state law AB 1482, which also caps annual rent increases at 5% plus CPI (not exceeding 10%). Single-family homes and condos are generally exempt from local rent control unless they were built before 1979 and had tenants prior to 1996. When purchasing a multi-unit building in San Francisco, it's crucial to understand the rent control status of each unit, current tenant rights, and their impact on property operations and value.",
    artifactType: "table",
    artifactData: {
      title: "San Francisco Rent Control Overview",
      columns: [
        "Aspect",
        "Pre-1979 Buildings",
        "Post-1979 Buildings",
        "Single-Family/Condos",
        "Notes",
      ],
      rows: [
        [
          "Rent Increase Limits",
          "60% of CPI (~1-3% annually)",
          "5% + CPI (max 10%) under AB 1482",
          "Generally exempt*, see notes",
          "*Unless pre-1979 with tenant before 1996",
        ],
        [
          "Just Cause Eviction",
          "Required",
          "Required under AB 1482",
          "Required under AB 1482",
          "SF has stricter protections than state law",
        ],
        [
          "Owner Move-In",
          "Allowed with restrictions",
          "Allowed with restrictions",
          "Allowed with restrictions",
          "Requires principal residence for 36+ months",
        ],
        [
          "Ellis Act Eviction",
          "Allowed with restrictions",
          "Allowed with restrictions",
          "Allowed with restrictions",
          "5-year withdrawal from rental market",
        ],
        [
          "Buyout Agreements",
          "Regulated, must register",
          "Regulated, must register",
          "Regulated, must register",
          "Minimum $9,500 relocation payment",
        ],
        [
          "Pass-through Costs",
          "Limited categories only",
          "Not regulated",
          "Not regulated",
          "Capital improvements, utilities, bonds",
        ],
        [
          "Relocation Payments",
          "Required for no-fault evictions",
          "Required under AB 1482",
          "Required under AB 1482",
          "$7,500+ per tenant, higher for seniors/disabled",
        ],
        [
          "Vacancy Control",
          "None - can reset rent",
          "None - can reset rent",
          "None - can reset rent",
          "New tenants can be charged market rate",
        ],
        [
          "Condo Conversion",
          "Heavily restricted",
          "Less restricted",
          "N/A",
          "Annual lottery system with limited permits",
        ],
      ],
    },
  },
  {
    id: "q24",
    category: "legal",
    question: "What permits do I need for home renovations in San Francisco?",
    answer:
      "San Francisco has one of the most comprehensive permitting processes in the country, administered by the Department of Building Inspection (DBI). Most home renovation projects require permits, though the specific requirements depend on the project scope. For kitchen and bathroom remodels, permits are required when changing the layout, moving plumbing/electrical, or altering walls, but not for simple cosmetic updates like replacing cabinets or countertops in the same configuration. Structural changes, including removing walls, adding rooms, or altering the building envelope always require permits. Electrical and plumbing modifications generally need permits, though simple replacements of fixtures in the same location may be exempt. For historically significant buildings or properties in historic districts, additional review by the Historic Preservation Commission may be required. The permitting pathway varies based on project complexity—minor alterations can often use an over-the-counter process, while major renovations require plan review, which can take 6-12+ months. Working with professionals familiar with San Francisco's permitting process is highly recommended to navigate these complex requirements.",
    artifactType: "table",
    artifactData: {
      title: "San Francisco Home Renovation Permit Requirements",
      columns: [
        "Project Type",
        "Permit Required",
        "Process Type",
        "Timeline",
        "Special Requirements",
        "Estimated Fees",
      ],
      rows: [
        ["Kitchen Remodel (cosmetic only)", "No", "N/A", "N/A", "None", "$0"],
        [
          "Kitchen Remodel (layout changes)",
          "Yes",
          "Over-the-counter possible",
          "1-4 weeks",
          "Plumbing/electrical permits",
          "$600-1,200",
        ],
        ["Bathroom Remodel (cosmetic)", "No", "N/A", "N/A", "None", "$0"],
        [
          "Bathroom Remodel (layout changes)",
          "Yes",
          "Over-the-counter possible",
          "1-4 weeks",
          "Plumbing/electrical permits",
          "$600-1,000",
        ],
        [
          "Interior Wall Removal (non-load bearing)",
          "Yes",
          "Over-the-counter possible",
          "1-4 weeks",
          "Plans required",
          "$500-800",
        ],
        [
          "Interior Wall Removal (load bearing)",
          "Yes",
          "Plan review",
          "2-6 months",
          "Structural engineering required",
          "$1,200-2,500",
        ],
        [
          "Room Addition",
          "Yes",
          "Plan review",
          "6-12+ months",
          "Neighborhood notification",
          "$3,000-10,000+",
        ],
        [
          "Window Replacement (same size)",
          "Yes",
          "Over-the-counter",
          "1-2 weeks",
          "Energy compliance",
          "$500-800",
        ],
        [
          "Window Replacement (size change)",
          "Yes",
          "Plan review",
          "2-6 months",
          "Façade alteration review",
          "$800-1,500",
        ],
        [
          "Deck Addition/Replacement",
          "Yes",
          "Plan review",
          "2-6 months",
          "Structural plans required",
          "$1,000-2,500",
        ],
        [
          "Roof Replacement",
          "Yes",
          "Over-the-counter",
          "1-2 weeks",
          "Fire rating compliance",
          "$500-800",
        ],
        [
          "ADU Addition",
          "Yes",
          "Plan review",
          "6-12+ months",
          "Special ADU program review",
          "$6,000-15,000+",
        ],
        [
          "Foundation Work",
          "Yes",
          "Plan review",
          "3-8 months",
          "Structural engineering required",
          "$2,000-5,000+",
        ],
        [
          "Electrical Panel Upgrade",
          "Yes",
          "Over-the-counter",
          "1-3 weeks",
          "Electrical permits",
          "$400-700",
        ],
        [
          "Solar Panel Installation",
          "Yes",
          "Priority processing",
          "2-8 weeks",
          "Structural verification",
          "$600-1,000",
        ],
      ],
    },
  },

  // Miscellaneous
  {
    id: "q25",
    category: "misc",
    question: "How do property taxes work in San Francisco?",
    answer:
      "Property taxes in San Francisco consist of several components. The base tax rate is set at 1% of the assessed value, as mandated by California's Proposition 13. Additional voter-approved bonds and special assessments add approximately 0.2-0.4%, bringing the effective tax rate to about 1.2-1.4%. Under Proposition 13, assessed value is established at purchase price and can only increase by a maximum of 2% annually, regardless of market appreciation, until the property changes ownership. This creates significant disparities, with newer homeowners often paying substantially higher taxes than long-term owners of similar properties. San Francisco provides several property tax exemptions, including the Homeowner's Exemption ($7,000 reduction in assessed value), exemptions for disabled veterans, and property tax postponement for seniors and disabled persons. Properties may also be reassessed upon significant improvements or additions, but normal maintenance and repairs don't trigger reassessment. Property tax bills are issued annually with payments due in two installments (December 10 and April 10). New homeowners should budget for supplemental tax bills that adjust taxes between the previous owner's assessment and the new purchase price.",
    artifactType: "chart",
    artifactData: {
      type: "pie",
      title: "San Francisco Property Tax Breakdown for $1.5M Home",
      data: [
        { category: "Base Tax Rate (1%)", value: 15000, percentage: 78.9 },
        {
          category: "SF Unified School District Bonds",
          value: 1650,
          percentage: 8.7,
        },
        { category: "SF Community College Bonds", value: 525, percentage: 2.8 },
        { category: "City College Parcel Tax", value: 99, percentage: 0.5 },
        { category: "Teacher Support Parcel Tax", value: 320, percentage: 1.7 },
        { category: "SFUSD Facilities Tax", value: 290, percentage: 1.5 },
        { category: "City Services Parcel Tax", value: 395, percentage: 2.1 },
        { category: "Bay Restoration Authority", value: 12, percentage: 0.1 },
        {
          category: "SF General Obligation Bonds",
          value: 709,
          percentage: 3.7,
        },
      ],
      total: 19000,
      effectiveRate: 1.27,
    },
  },
  {
    id: "q26",
    category: "misc",
    question: "How does climate change impact real estate in San Francisco?",
    answer:
      "Climate change is increasingly influencing San Francisco's real estate market in several ways. Sea level rise presents the most direct physical risk, with projections showing potential inundation of low-lying areas like Mission Bay, parts of the Financial District, and the Embarcadero by 2050-2080. Properties in these areas may face increased flood insurance requirements and potential value impacts in the coming decades. Wildfire smoke from regional fires has become a more frequent issue, driving interest in homes with advanced air filtration systems and creating seasonal air quality concerns that impact outdoor amenity values. Drought conditions have pushed the city to adopt stricter water conservation requirements for properties, while prompting homeowners to invest in drought-resistant landscaping and water-efficient fixtures. Energy resilience has gained importance due to potential power shutoffs during high fire danger periods, increasing the value of solar installations with battery backup systems. The city's Climate Action Plan includes increasingly stringent building efficiency standards, potentially requiring future retrofits for older properties. While these factors haven't dramatically altered current market values, they're beginning to influence buyer preferences and long-term investment considerations.",
    artifactType: "map",
    artifactData: {
      title: "Climate Risk Factors for San Francisco Real Estate",
      centerLat: 37.7749,
      centerLng: -122.4194,
      zoom: 12,
      layers: [
        {
          name: "Sea Level Rise Risk Zones",
          description: "Areas potentially impacted by sea level rise by 2070",
          color: "#1E88E5",
          opacity: 0.6,
          areas: [
            { area: "Mission Bay", riskLevel: "High", projectedYear: 2050 },
            { area: "Embarcadero", riskLevel: "High", projectedYear: 2060 },
            { area: "Treasure Island", riskLevel: "High", projectedYear: 2050 },
            {
              area: "Marina District (parts)",
              riskLevel: "Moderate",
              projectedYear: 2070,
            },
            { area: "Mission Creek", riskLevel: "High", projectedYear: 2050 },
            {
              area: "Hunters Point",
              riskLevel: "Moderate",
              projectedYear: 2070,
            },
          ],
        },
        {
          name: "Liquefaction Risk Zones",
          description: "Areas with higher earthquake liquefaction risk",
          color: "#FFA000",
          opacity: 0.5,
          areas: [
            {
              area: "Marina District",
              riskLevel: "Very High",
              notes: "Built on fill",
            },
            {
              area: "Financial District",
              riskLevel: "High",
              notes: "Partially on fill",
            },
            {
              area: "Mission District",
              riskLevel: "Moderate to High",
              notes: "Former marsh",
            },
            { area: "SOMA", riskLevel: "High", notes: "Built on fill" },
            {
              area: "Treasure Island",
              riskLevel: "Very High",
              notes: "Artificial island",
            },
          ],
        },
        {
          name: "Wildfire Smoke Impact",
          description: "Areas with historical wildfire smoke concentration",
          color: "#FF5252",
          opacity: 0.3,
          areas: [
            { area: "Mission", riskLevel: "Moderate", notes: "Valley effect" },
            { area: "SOMA", riskLevel: "Moderate", notes: "Low elevation" },
            {
              area: "Twin Peaks",
              riskLevel: "Lower",
              notes: "Higher elevation",
            },
            { area: "Richmond", riskLevel: "Lower", notes: "Ocean breeze" },
            { area: "Sunset", riskLevel: "Lower", notes: "Ocean breeze" },
          ],
        },
        {
          name: "Urban Heat Island Effect",
          description:
            "Areas with higher temperature increases during heat events",
          color: "#D32F2F",
          opacity: 0.4,
          areas: [
            { area: "Downtown", riskLevel: "High", notes: "Concrete density" },
            { area: "Mission", riskLevel: "High", notes: "Less tree cover" },
            { area: "Bayview", riskLevel: "High", notes: "Industrial areas" },
            {
              area: "Golden Gate Park Adjacent",
              riskLevel: "Low",
              notes: "Green space cooling",
            },
            {
              area: "Presidio Adjacent",
              riskLevel: "Low",
              notes: "Green space cooling",
            },
          ],
        },
      ],
    },
  },
  {
    id: "q27",
    category: "misc",
    question: "How can I estimate utility costs for a home?",
    answer:
      "Estimating utility costs for San Francisco homes involves considering several factors unique to the city. PG&E provides electricity and gas, with tiered rate structures that increase with usage. Average monthly utility costs for a typical 2-bedroom home range from $150-$300, varying by home size, efficiency, and usage patterns. San Francisco's mild climate reduces heating and cooling costs compared to other regions, but the city's older housing stock often lacks proper insulation. Homes in foggy western neighborhoods (Sunset/Richmond) typically have higher heating costs, while sunny eastern neighborhoods see lower heating needs. Water/sewer costs through SFPUC average $100-$200 monthly for a typical household, with drought surcharges possible during water restrictions. Trash/recycling services from Recology cost approximately $40-$70 monthly. Internet service ranges from $50-$120 depending on provider and speed. When evaluating a potential home, review the seller's utility disclosure or request recent utility bills. Consider the home's energy efficiency features, presence of single-pane windows, insulation quality, and heating system type. For long-term planning, factor in San Francisco's Climate Action Plan which may require energy retrofits for older properties in coming years.",
    artifactType: "calculator",
    artifactData: {
      title: "San Francisco Monthly Utility Cost Estimator",
      inputs: [
        {
          name: "homeSize",
          label: "Home Size",
          type: "select",
          options: [
            { value: "small", label: "Small (Under 1,000 sq ft)" },
            { value: "medium", label: "Medium (1,000-2,000 sq ft)" },
            { value: "large", label: "Large (Over 2,000 sq ft)" },
          ],
        },
        {
          name: "occupants",
          label: "Number of Occupants",
          type: "number",
          min: 1,
          max: 10,
        },
        {
          name: "heatingSystem",
          label: "Heating System",
          type: "select",
          options: [
            { value: "gasForced", label: "Gas Forced Air" },
            { value: "gasWall", label: "Gas Wall Heater" },
            { value: "electric", label: "Electric" },
            { value: "heatPump", label: "Heat Pump" },
            { value: "none", label: "None/Minimal" },
          ],
        },
        {
          name: "neighborhood",
          label: "Neighborhood",
          type: "select",
          options: [
            { value: "foggy", label: "Foggy (Sunset, Richmond, Parkside)" },
            {
              value: "moderate",
              label: "Moderate (Castro, Noe Valley, Bernal)",
            },
            { value: "sunny", label: "Sunny (Mission, Potrero, Bayview)" },
          ],
        },
        {
          name: "insulation",
          label: "Insulation Quality",
          type: "select",
          options: [
            { value: "poor", label: "Poor (Pre-1950s, unimproved)" },
            { value: "average", label: "Average (Partially updated)" },
            { value: "good", label: "Good (Recently renovated/New)" },
          ],
        },
        {
          name: "windows",
          label: "Window Type",
          type: "select",
          options: [
            { value: "single", label: "Single-Pane" },
            { value: "double", label: "Double-Pane" },
            { value: "efficient", label: "Energy Efficient" },
          ],
        },
      ],
      calculations: {
        electricity: {
          base: {
            small: 65,
            medium: 85,
            large: 115,
          },
          occupantFactor: 10,
          heatingFactor: {
            gasForced: 0,
            gasWall: 0,
            electric: 75,
            heatPump: 45,
            none: 0,
          },
          neighborhoodFactor: {
            foggy: 1.1,
            moderate: 1.0,
            sunny: 0.9,
          },
          insulationFactor: {
            poor: 1.3,
            average: 1.0,
            good: 0.8,
          },
          windowsFactor: {
            single: 1.2,
            double: 1.0,
            efficient: 0.9,
          },
        },
        gas: {
          base: {
            small: 35,
            medium: 55,
            large: 85,
          },
          occupantFactor: 8,
          heatingFactor: {
            gasForced: 60,
            gasWall: 45,
            electric: 0,
            heatPump: 0,
            none: 0,
          },
          neighborhoodFactor: {
            foggy: 1.4,
            moderate: 1.0,
            sunny: 0.7,
          },
          insulationFactor: {
            poor: 1.4,
            average: 1.0,
            good: 0.8,
          },
          windowsFactor: {
            single: 1.3,
            double: 1.0,
            efficient: 0.9,
          },
        },
        water: {
          base: 85,
          occupantFactor: 25,
        },
        sewer: {
          base: 65,
          occupantFactor: 20,
        },
        trash: {
          small: 45,
          medium: 55,
          large: 65,
        },
        internet: 80,
      },
    },
  },
  {
    id: "q28",
    category: "misc",
    question:
      "What's the average cost of homeowners insurance in San Francisco?",
    answer:
      "Homeowners insurance in San Francisco averages $1,800-$2,500 annually for a typical single-family home and $900-$1,400 for condominiums, though costs vary significantly based on several factors. Location within the city affects rates, with homes in areas like Seacliff and Marina District seeing higher premiums due to increased earthquake and flooding risks. The property's age and construction type significantly impact costs, with newer homes benefiting from modern building codes and fire-resistant materials, while Victorian and Edwardian homes often have higher rates due to older electrical systems and wood construction. Coverage limits are typically based on replacement cost rather than market value (which can be substantially higher in SF), with most insurers recommending coverage of $350-$550 per square foot for rebuilding. Deductibles range from $1,000-$2,500 for standard coverage, with separate earthquake insurance requiring higher deductibles (typically 10-15% of dwelling coverage). Most standard policies exclude earthquake coverage, which must be purchased separately through the California Earthquake Authority or private insurers at an additional premium of $2,000-$5,000+ annually. Flood insurance is required in FEMA-designated flood zones and recommended for properties in potential sea-level rise areas.",
    artifactType: "chart",
    artifactData: {
      type: "bar",
      title: "Average Annual Insurance Costs by Property Type and Neighborhood",
      xAxis: "Neighborhood",
      yAxis: "Annual Premium ($)",
      dataSets: [
        {
          name: "Victorian/Edwardian (Pre-1925)",
          data: [
            { neighborhood: "Pacific Heights", premium: 2800 },
            { neighborhood: "Noe Valley", premium: 2600 },
            { neighborhood: "Marina", premium: 3200 },
            { neighborhood: "Sunset", premium: 2400 },
            { neighborhood: "Bernal Heights", premium: 2500 },
          ],
        },
        {
          name: "Mid-Century (1925-1970)",
          data: [
            { neighborhood: "Pacific Heights", premium: 2500 },
            { neighborhood: "Noe Valley", premium: 2300 },
            { neighborhood: "Marina", premium: 2900 },
            { neighborhood: "Sunset", premium: 2100 },
            { neighborhood: "Bernal Heights", premium: 2200 },
          ],
        },
        {
          name: "Modern (Post-1970)",
          data: [
            { neighborhood: "Pacific Heights", premium: 2100 },
            { neighborhood: "Noe Valley", premium: 1900 },
            { neighborhood: "Marina", premium: 2600 },
            { neighborhood: "Sunset", premium: 1800 },
            { neighborhood: "Bernal Heights", premium: 1900 },
          ],
        },
        {
          name: "Condominium",
          data: [
            { neighborhood: "Pacific Heights", premium: 1300 },
            { neighborhood: "Noe Valley", premium: 1200 },
            { neighborhood: "Marina", premium: 1400 },
            { neighborhood: "Sunset", premium: 1000 },
            { neighborhood: "Bernal Heights", premium: 1100 },
          ],
        },
      ],
      additionalData: {
        earthquakeCoverage: {
          title: "Additional Annual Earthquake Insurance Premiums",
          singleFamily: {
            low: 2000,
            average: 3500,
            high: 5500,
          },
          condo: {
            low: 800,
            average: 1500,
            high: 2500,
          },
          factors: [
            "Year built (pre/post-1980 building codes)",
            "Construction type (wood frame vs. masonry)",
            "Foundation type (raised vs. slab)",
            "Retrofitting improvements",
            "Soil type (liquefaction risk)",
          ],
        },
      },
    },
  },
  {
    id: "q29",
    category: "market",
    question:
      "How does the tech industry affect San Francisco's housing market?",
    answer:
      "The tech industry has fundamentally transformed San Francisco's housing market over the past two decades. The influx of high-income tech workers has significantly driven price appreciation, with median home values increasing approximately 160% since 2010—substantially outpacing the national average of 70%. Neighborhoods close to tech shuttle routes to Silicon Valley or near SOMA/Mid-Market tech offices have seen particularly strong appreciation. The industry's compensation structure, which often includes substantial equity components, has created waves of home-buying after major IPOs or acquisition events, though this effect has moderated in recent years. The pandemic accelerated changes with the rise of remote work, creating a temporary exodus in 2020-2021 that briefly cooled the market, particularly for condominiums. However, the market recovered as hybrid work models emerged, with many tech workers returning but seeking larger homes with dedicated office space. The city has responded with policy interventions including increased inclusionary housing requirements for new developments and office linkage fees to fund affordable housing. Looking forward, the housing market remains sensitive to tech industry trends, including layoff cycles, venture capital funding availability, and evolving remote work policies at major employers.",
    artifactType: "chart",
    artifactData: {
      type: "multi",
      title: "Tech Industry's Impact on San Francisco Housing Market",
      charts: [
        {
          type: "line",
          title: "Median Home Price vs. Tech Employment (2010-2025)",
          xAxis: "Year",
          yAxis: {
            left: "Median Home Price ($)",
            right: "Tech Jobs (thousands)",
          },
          data: [
            { year: "2010", price: 785000, jobs: 48 },
            { year: "2011", price: 765000, jobs: 54 },
            { year: "2012", price: 820000, jobs: 59 },
            { year: "2013", price: 915000, jobs: 68 },
            { year: "2014", price: 1075000, jobs: 77 },
            { year: "2015", price: 1150000, jobs: 86 },
            { year: "2016", price: 1235000, jobs: 92 },
            { year: "2017", price: 1380000, jobs: 97 },
            { year: "2018", price: 1610000, jobs: 103 },
            { year: "2019", price: 1645000, jobs: 118 },
            { year: "2020", price: 1625000, jobs: 112 },
            { year: "2021", price: 1825000, jobs: 105 },
            { year: "2022", price: 1950000, jobs: 114 },
            { year: "2023", price: 1850000, jobs: 109 },
            { year: "2024", price: 2050000, jobs: 116 },
          ],
        },
        {
          type: "bar",
          title: "Price Growth % by Neighborhood Proximity to Tech (2014-2024)",
          xAxis: "Neighborhood",
          yAxis: "10-Year Price Growth (%)",
          data: [
            { neighborhood: "Mission Bay (Tech Hub)", growth: 93 },
            { neighborhood: "Potrero Hill (Tech Adjacent)", growth: 87 },
            { neighborhood: "Mission (Tech Shuttle)", growth: 82 },
            { neighborhood: "Noe Valley (Tech Shuttle)", growth: 79 },
            { neighborhood: "SOMA (Tech Offices)", growth: 76 },
            { neighborhood: "Bernal Heights (Mix)", growth: 72 },
            { neighborhood: "Castro (Mix)", growth: 68 },
            { neighborhood: "Russian Hill (Traditional)", growth: 63 },
            { neighborhood: "Outer Sunset (Traditional)", growth: 61 },
            { neighborhood: "Bayview (Traditional)", growth: 57 },
          ],
        },
        {
          type: "scatter",
          title: "Major Tech Events and Housing Market Impact",
          xAxis: "Year",
          yAxis: "Market Impact",
          data: [
            {
              year: 2012,
              event: "Facebook IPO",
              impact: 8,
              detail: "Mission/Noe Valley surge",
            },
            {
              year: 2013,
              event: "Twitter IPO",
              impact: 7,
              detail: "Hayes Valley/SOMA surge",
            },
            {
              year: 2014,
              event: "Apple Campus 2",
              impact: 4,
              detail: "Southwest SF demand",
            },
            {
              year: 2017,
              event: "Dropbox IPO",
              impact: 5,
              detail: "SOMA condo demand",
            },
            {
              year: 2019,
              event: "Uber & Lyft IPOs",
              impact: 6,
              detail: "Multi-neighborhood effect",
            },
            {
              year: 2020,
              event: "Pandemic WFH",
              impact: 9,
              detail: "Urban flight, condo decline",
            },
            {
              year: 2021,
              event: "Coinbase IPO",
              impact: 5,
              detail: "Luxury segment boost",
            },
            {
              year: 2021,
              event: "Airbnb IPO",
              impact: 4,
              detail: "Modest effect (post-pandemic)",
            },
            {
              year: 2022,
              event: "Tech Layoffs Begin",
              impact: 7,
              detail: "Market cooling",
            },
            {
              year: 2023,
              event: "Return to Office",
              impact: 6,
              detail: "Condo recovery",
            },
            { year: 2023, event: "AI Boom", impact: 5, detail: "SOMA revival" },
          ],
        },
      ],
    },
  },
  {
    id: "q30",
    category: "investment",
    question: "What tax benefits are available for homeowners?",
    answer:
      "Homeowners in San Francisco benefit from several tax advantages at the federal, state, and local levels. The mortgage interest deduction allows itemizing homeowners to deduct interest on mortgages up to $750,000 ($1 million for loans originated before December 16, 2017). This is particularly valuable in San Francisco's high-cost market where many mortgages approach these limits. Property tax deductions are capped at $10,000 annually as part of the state and local tax (SALT) deduction limitation. Capital gains exclusions provide significant benefits when selling, allowing married couples to exclude up to $500,000 ($250,000 for individuals) of profit from taxation if they've lived in the home as their primary residence for at least two of the previous five years. Home office deductions may apply for self-employed individuals who use part of their home exclusively for business. Energy efficiency tax credits are available for qualifying improvements like solar panels, which are increasingly popular in San Francisco. California also offers specific benefits, including property tax reassessment protections under Proposition 13 that limit annual increases to 2% regardless of market appreciation. Additionally, seniors over 55 may transfer their property tax basis to a new home once in their lifetime under certain conditions per Proposition 19, which is especially valuable in California's high property tax environment.",
    artifactType: "table",
    artifactData: {
      title: "Homeowner Tax Benefits Comparison",
      columns: [
        "Tax Benefit",
        "Federal",
        "California",
        "Example for $1.5M San Francisco Home",
      ],
      rows: [
        [
          "Mortgage Interest Deduction",
          "Yes - on loans up to $750K",
          "Yes - follows federal",
          "~$24,000/year tax deduction (new loan at 5.5%)",
        ],
        [
          "Property Tax Deduction",
          "Yes - limited to $10K SALT cap",
          "Yes - no limit",
          "$10,000 maximum federal deduction",
        ],
        [
          "Capital Gains Exclusion",
          "$500K married/$250K single",
          "Follows federal",
          "Up to $500K tax-free profit when selling",
        ],
        [
          "Property Tax Increase Limit",
          "N/A",
          "Yes - 2% max annual increase",
          "~$7,500 annual savings vs. market rate reassessment",
        ],
        [
          "Prop 19 Tax Basis Transfer",
          "N/A",
          "Yes - for 55+ homeowners",
          "Potential $10,000+ annual savings when downsizing",
        ],
        [
          "Home Office Deduction",
          "Yes - if self-employed",
          "Yes - follows federal",
          "$2,000-5,000 for qualifying home businesses",
        ],
        [
          "Energy Efficiency Credits",
          "Yes - up to 30% for solar",
          "Yes - additional rebates",
          "$6,000-9,000 for typical solar installation",
        ],
        [
          "Mortgage Credit Certificate",
          "Yes - for first-time buyers",
          "Yes - administered by CALHFA",
          "Tax credit of 15-20% of mortgage interest",
        ],
        [
          "Homeowner's Exemption",
          "N/A",
          "Yes - $7,000 reduction in assessed value",
          "~$70-100 annual property tax reduction",
        ],
        [
          "Seismic Retrofit Exclusion",
          "N/A",
          "Yes - improvements not reassessed",
          "No added property tax for earthquake upgrades",
        ],
      ],
    },
  },
];

// Organize questions by category for easy access
export const questionsByCategory = {
  market: questionsData.filter((q) => q.category === "market"),
  neighborhoods: questionsData.filter((q) => q.category === "neighborhoods"),
  firstTimeBuyer: questionsData.filter((q) => q.category === "firstTimeBuyer"),
  investment: questionsData.filter((q) => q.category === "investment"),
  mortgage: questionsData.filter((q) => q.category === "mortgage"),
  process: questionsData.filter((q) => q.category === "process"),
  property: questionsData.filter((q) => q.category === "property"),
  legal: questionsData.filter((q) => q.category === "legal"),
  misc: questionsData.filter((q) => q.category === "misc"),
};

// Export recommended questions based on user profile
export const getRecommendedQuestions = (userProfile) => {
  let recommended = [];

  if (userProfile.experience === "first-time") {
    recommended = recommended.concat(
      questionsByCategory.firstTimeBuyer.map((q) => q.question),
    );
  }

  if (userProfile.purpose === "investment") {
    recommended = recommended.concat(
      questionsByCategory.investment.map((q) => q.question).slice(0, 3),
    );
  }

  if (userProfile.interests && userProfile.interests.includes("neighborhood")) {
    recommended = recommended.concat(
      questionsByCategory.neighborhoods.map((q) => q.question).slice(0, 2),
    );
  }

  if (userProfile.budget && userProfile.budget > 1500000) {
    recommended.push(
      questionsByCategory.market.find((q) => q.id === "q11").question,
    );
    recommended.push(
      questionsByCategory.legal.find((q) => q.id === "q14").question,
    );
  }

  if (userProfile.timeline === "researching") {
    recommended = recommended.concat(
      questionsByCategory.market.map((q) => q.question).slice(0, 2),
    );
  }

  if (userProfile.family === "yes") {
    recommended.push(
      questionsByCategory.neighborhoods.find((q) => q.id === "q4").question,
    );
  }

  // Ensure we have a minimum number of recommended questions
  if (recommended.length < 5) {
    // Add some general questions everyone should know
    const generalQuestions = [
      questionsByCategory.process.find((q) => q.id === "q16").question,
      questionsByCategory.mortgage.find((q) => q.id === "q13").question,
      questionsByCategory.property.find((q) => q.id === "q19").question,
    ];

    recommended = recommended.concat(
      generalQuestions.filter((q) => !recommended.includes(q)),
    );
  }

  // Limit to 5 questions and shuffle
  return recommended.slice(0, 5).sort(() => Math.random() - 0.5);
};

// Helper function to find a question by its ID
export const findQuestionById = (id) => {
  return questionsData.find((q) => q.id === id);
};

// Helper function to find a response based on user input
export const findRelevantQuestion = (userInput) => {
  userInput = userInput.toLowerCase();

  // Try to find an exact match or close match
  for (const question of questionsData) {
    if (
      question.question.toLowerCase().includes(userInput) ||
      userInput.includes(question.question.toLowerCase().slice(0, 15))
    ) {
      return question;
    }
  }

  // If no exact match, look for keyword matches
  const keywordMap = {
    market: ["market", "trend", "price", "appreciation", "value", "worth"],
    neighborhood: [
      "neighborhood",
      "area",
      "district",
      "location",
      "community",
      "where",
      "live",
    ],
    mortgage: [
      "mortgage",
      "loan",
      "interest",
      "rate",
      "financing",
      "payment",
      "down payment",
    ],
    firstTimeBuyer: [
      "first time",
      "beginner",
      "start",
      "process",
      "steps",
      "new to",
    ],
    investment: [
      "investment",
      "rental",
      "cash flow",
      "roi",
      "return",
      "income property",
      "cap rate",
    ],
    process: ["process", "timeline", "closing", "escrow", "offer", "negotiate"],
    property: [
      "property",
      "home",
      "house",
      "condo",
      "inspection",
      "feature",
      "type",
    ],
    legal: [
      "legal",
      "law",
      "disclosure",
      "permit",
      "regulation",
      "requirement",
      "tenant",
      "rent control",
    ],
    tax: ["tax", "deduction", "write-off", "benefit", "property tax"],
  };

  for (const [category, keywords] of Object.entries(keywordMap)) {
    for (const keyword of keywords) {
      if (userInput.includes(keyword)) {
        const categoryQuestions =
          questionsByCategory[category === "tax" ? "misc" : category];
        if (categoryQuestions && categoryQuestions.length > 0) {
          return categoryQuestions[
            Math.floor(Math.random() * categoryQuestions.length)
          ];
        }
      }
    }
  }

  // If still no match, return a default question about market trends
  return questionsByCategory.market[0];
};
