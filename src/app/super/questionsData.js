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
  // New entries for missing answerable questions
  {
    id: "q31",
    category: "market",
    question: "How has the San Francisco housing inventory changed recently?",
    answer:
      "The San Francisco housing inventory has experienced significant fluctuations over the past few years. Currently, inventory is up approximately 15-20% compared to last year, providing more options for buyers than we've seen in recent years. This increase follows the pandemic-related migration patterns and subsequent return-to-office policies. Single-family home inventory remains relatively tight, especially in desirable neighborhoods, while the condominium market has seen more substantial inventory growth. Active listings typically stay on the market for an average of 28 days, up from the 14-18 days we saw during the highly competitive 2021 market. Seasonally, inventory tends to peak in late summer/early fall and reaches its lowest point during winter holidays. The higher-end luxury market ($3M+) currently has proportionally more inventory than the mid-market segment. These inventory changes have helped create a more balanced market compared to the extreme seller's market conditions of previous years, giving buyers more time to make decisions and slightly improved negotiating leverage.",
    artifactType: "chart",
    artifactData: {
      type: "line",
      title: "San Francisco Housing Inventory Trends (2020-2024)",
      xAxis: "Quarter",
      yAxis: "Active Listings",
      dataSets: [
        {
          name: "Single-Family Homes",
          data: [
            { quarter: "Q1 2020", listings: 580 },
            { quarter: "Q2 2020", listings: 780 },
            { quarter: "Q3 2020", listings: 950 },
            { quarter: "Q4 2020", listings: 640 },
            { quarter: "Q1 2021", listings: 520 },
            { quarter: "Q2 2021", listings: 610 },
            { quarter: "Q3 2021", listings: 680 },
            { quarter: "Q4 2021", listings: 490 },
            { quarter: "Q1 2022", listings: 410 },
            { quarter: "Q2 2022", listings: 560 },
            { quarter: "Q3 2022", listings: 620 },
            { quarter: "Q4 2022", listings: 480 },
            { quarter: "Q1 2023", listings: 430 },
            { quarter: "Q2 2023", listings: 580 },
            { quarter: "Q3 2023", listings: 640 },
            { quarter: "Q4 2023", listings: 510 },
            { quarter: "Q1 2024", listings: 490 },
            { quarter: "Q2 2024", listings: 650 },
          ],
        },
        {
          name: "Condominiums",
          data: [
            { quarter: "Q1 2020", listings: 740 },
            { quarter: "Q2 2020", listings: 1250 },
            { quarter: "Q3 2020", listings: 1480 },
            { quarter: "Q4 2020", listings: 1100 },
            { quarter: "Q1 2021", listings: 890 },
            { quarter: "Q2 2021", listings: 760 },
            { quarter: "Q3 2021", listings: 680 },
            { quarter: "Q4 2021", listings: 620 },
            { quarter: "Q1 2022", listings: 580 },
            { quarter: "Q2 2022", listings: 720 },
            { quarter: "Q3 2022", listings: 850 },
            { quarter: "Q4 2022", listings: 730 },
            { quarter: "Q1 2023", listings: 690 },
            { quarter: "Q2 2023", listings: 880 },
            { quarter: "Q3 2023", listings: 940 },
            { quarter: "Q4 2023", listings: 760 },
            { quarter: "Q1 2024", listings: 820 },
            { quarter: "Q2 2024", listings: 990 },
          ],
        },
      ],
    },
  },
  {
    id: "q32",
    category: "market",
    question: "Is it a buyer's or seller's market in San Francisco right now?",
    answer:
      "The San Francisco real estate market is currently transitioning from a strong seller's market toward more balanced conditions, though it varies by neighborhood and price point. The market is most accurately described as a 'moderate seller's market' with signs of increasing balance. Homes are selling in an average of 28 days (up from 14-18 days in 2021), and approximately 22% of listings are experiencing price reductions, compared to just 8-10% in 2021. The average sale-to-list price ratio has decreased to 98.5%, down from the 110%+ we saw at the market peak. Inventory has increased by approximately 15-20% year-over-year, giving buyers more options. However, well-priced properties in desirable neighborhoods still attract multiple offers, particularly single-family homes under $2 million. The condominium market is closer to balanced conditions, with more generous buyer contingencies becoming acceptable again. Higher-end luxury properties ($3M+) are experiencing longer market times and more price negotiability. This shifting dynamic gives well-prepared buyers better negotiating power than in recent years, while sellers of desirable properties in prime locations can still expect strong results if they price strategically.",
    artifactType: "chart",
    artifactData: {
      type: "gauge",
      title: "Current San Francisco Real Estate Market Balance",
      min: 0,
      max: 10,
      value: 6.5,
      markers: [
        { value: 0, label: "Extreme Buyer's Market" },
        { value: 2.5, label: "Buyer's Market" },
        { value: 5, label: "Balanced Market" },
        { value: 7.5, label: "Seller's Market" },
        { value: 10, label: "Extreme Seller's Market" },
      ],
      segments: [
        { min: 0, max: 3, color: "blue" },
        { min: 3, max: 7, color: "green" },
        { min: 7, max: 10, color: "red" },
      ],
      indicators: [
        {
          name: "Days on Market",
          value: 28,
          trend: "Increasing",
          favorsBuyers: true,
        },
        {
          name: "Sale-to-List Ratio",
          value: "98.5%",
          trend: "Decreasing",
          favorsBuyers: true,
        },
        {
          name: "Price Reductions",
          value: "22% of listings",
          trend: "Increasing",
          favorsBuyers: true,
        },
        {
          name: "Inventory Levels",
          value: "15-20% Higher YoY",
          trend: "Increasing",
          favorsBuyers: true,
        },
        {
          name: "Multiple Offers",
          value: "32% of properties",
          trend: "Decreasing",
          favorsBuyers: true,
        },
      ],
    },
  },
  {
    id: "q33",
    category: "market",
    question:
      "How long do homes typically stay on the market in San Francisco?",
    answer:
      "Currently, homes in San Francisco stay on the market for an average of 28 days, though this varies significantly by property type, neighborhood, price point, and property condition. Single-family homes in high-demand neighborhoods like Noe Valley and West Portal typically move faster, averaging 15-22 days on market, while condominiums generally take longer at 30-40 days. Properties in the luxury segment ($3M+) have the longest average days on market at 45-60 days. Well-priced, move-in ready properties continue to sell quickly, sometimes with competitive offers within the first week, while properties needing work or those initially priced above market value can linger for 60+ days. This represents a significant shift from the 2021 peak market, when the city-wide average was just 14-18 days. The current timing allows buyers more opportunity to carefully consider decisions and conduct due diligence. Seasonal variations also affect market time, with spring (April-June) and fall (September-October) typically seeing faster sales, while the winter holiday season (November-January) experiences longer market times. Properly priced properties remain the key factor; homes priced within 3-5% of market value typically sell much faster than those requiring subsequent price adjustments.",
    artifactType: "chart",
    artifactData: {
      type: "bar",
      title: "Average Days on Market by Property Type and Neighborhood (2024)",
      xAxis: "Neighborhood",
      yAxis: "Days on Market",
      dataSets: [
        {
          name: "Single-Family Homes",
          data: [
            { neighborhood: "Noe Valley", days: 17 },
            { neighborhood: "West Portal", days: 19 },
            { neighborhood: "Bernal Heights", days: 22 },
            { neighborhood: "Richmond", days: 25 },
            { neighborhood: "Sunset", days: 24 },
            { neighborhood: "Pacific Heights", days: 38 },
            { neighborhood: "Bayview", days: 32 },
          ],
        },
        {
          name: "Condominiums",
          data: [
            { neighborhood: "Noe Valley", days: 26 },
            { neighborhood: "West Portal", days: 31 },
            { neighborhood: "Bernal Heights", days: 29 },
            { neighborhood: "Richmond", days: 34 },
            { neighborhood: "Sunset", days: 35 },
            { neighborhood: "Pacific Heights", days: 42 },
            { neighborhood: "Bayview", days: 39 },
          ],
        },
        {
          name: "Luxury Properties ($3M+)",
          data: [
            { neighborhood: "Noe Valley", days: 48 },
            { neighborhood: "West Portal", days: 53 },
            { neighborhood: "Bernal Heights", days: 59 },
            { neighborhood: "Richmond", days: 62 },
            { neighborhood: "Sunset", days: 56 },
            { neighborhood: "Pacific Heights", days: 45 },
            { neighborhood: "Bayview", days: 68 },
          ],
        },
      ],
      annotations: [
        { text: "City Average: 28 days", yValue: 28, type: "line" },
        { text: "2021 Peak Market Average: 16 days", yValue: 16, type: "line" },
      ],
    },
  },
  {
    id: "q34",
    category: "pricing",
    question: "What's the average cost of a home in San Francisco?",
    answer:
      "The average cost of a home in San Francisco currently stands at approximately $1.65 million, though this figure varies substantially based on property type, neighborhood, and specific features. Single-family homes average $1.95 million, while condominiums average $1.25 million. Median prices, which better reflect typical purchase prices by eliminating extreme high-end sales, are approximately $1.52 million overall. Neighborhood variations are dramatic, with Pacific Heights and Presidio Heights single-family homes averaging well above $5 million, while more affordable areas like the Outer Sunset and Bayview offer single-family homes in the $1.2-1.4 million range. Entry-level condos in areas like Tenderloin or SoMa can start around $650,000-$850,000. Property condition significantly impacts pricing, with fully renovated homes commanding 15-25% premiums over similar properties needing updates. The price per square foot averages $1,050 citywide but ranges from $750-850 in outlying areas to $1,500+ in prime neighborhoods. High-rise view condos in prestige buildings can exceed $2,000 per square foot. Homes with parking, outdoor space, and updated systems typically command significant premiums in this space-constrained market.",
    artifactType: "chart",
    artifactData: {
      type: "bar",
      title: "Average Home Prices by Neighborhood and Property Type (2024)",
      xAxis: "Neighborhood",
      yAxis: "Price ($)",
      dataSets: [
        {
          name: "Single-Family Homes",
          data: [
            { neighborhood: "Pacific Heights", price: 5850000 },
            { neighborhood: "Noe Valley", price: 2850000 },
            { neighborhood: "Cole Valley", price: 2650000 },
            { neighborhood: "Marina", price: 3750000 },
            { neighborhood: "Richmond", price: 1950000 },
            { neighborhood: "Sunset", price: 1650000 },
            { neighborhood: "Bernal Heights", price: 1850000 },
            { neighborhood: "Bayview", price: 1150000 },
          ],
        },
        {
          name: "Condominiums",
          data: [
            { neighborhood: "Pacific Heights", price: 2450000 },
            { neighborhood: "Noe Valley", price: 1650000 },
            { neighborhood: "Cole Valley", price: 1450000 },
            { neighborhood: "Marina", price: 1850000 },
            { neighborhood: "Richmond", price: 1150000 },
            { neighborhood: "Sunset", price: 950000 },
            { neighborhood: "Bernal Heights", price: 1250000 },
            { neighborhood: "Bayview", price: 750000 },
          ],
        },
      ],
      annotations: [
        {
          text: "City Average (All Properties): $1.65M",
          yValue: 1650000,
          type: "line",
        },
        { text: "Median Price: $1.52M", yValue: 1520000, type: "line" },
      ],
      additionalStats: {
        pricePerSquareFoot: {
          citywide: 1050,
          range: {
            low: { area: "Outer Neighborhoods", value: 750 },
            high: { area: "Prime Districts", value: 1500 },
          },
          luxuryHighRise: 2000,
        },
      },
    },
  },
  {
    id: "q35",
    category: "pricing",
    question: "What are the most affordable neighborhoods in San Francisco?",
    answer:
      "The most affordable neighborhoods in San Francisco are primarily located in the southern and southeastern areas of the city. Bayview-Hunters Point offers the most accessible price points, with single-family homes averaging $950,000-$1.15 million. Excelsior and Visitacion Valley present affordable options with median home prices around $1.15-1.25 million. Outer Mission and Crocker-Amazon feature more spacious properties in the $1.2-1.3 million range. Oceanview and Ingleside offer relatively affordable homes with improving amenities at $1.25-1.35 million. For those seeking condominiums, Tenderloin provides entry-level units starting around $650,000, though buyers should carefully research specific blocks due to urban challenges. Outer Sunset and Outer Richmond, while increasingly popular, still offer relative value with homes averaging $1.4-1.6 million. Many of these affordable neighborhoods are experiencing revitalization with new businesses, improved transit connections, and community investment. First-time buyers should also explore adjacent cities like Daly City and South San Francisco, where median prices can be 15-25% lower than similar properties within San Francisco city limits. When comparing affordability, buyers should consider both purchase price and ongoing HOA fees, which can significantly impact monthly housing costs.",
    artifactType: "map",
    artifactData: {
      title: "Most Affordable Neighborhoods in San Francisco",
      centerLat: 37.7449,
      centerLng: -122.4194,
      zoom: 12,
      markers: [
        {
          name: "Bayview-Hunters Point",
          lat: 37.7299,
          lng: -122.3839,
          medianPrice: 1050000,
          pricePerSqFt: 720,
          affordabilityRank: 1,
        },
        {
          name: "Excelsior",
          lat: 37.7246,
          lng: -122.4222,
          medianPrice: 1180000,
          pricePerSqFt: 780,
          affordabilityRank: 2,
        },
        {
          name: "Visitacion Valley",
          lat: 37.7144,
          lng: -122.409,
          medianPrice: 1200000,
          pricePerSqFt: 790,
          affordabilityRank: 3,
        },
        {
          name: "Outer Mission",
          lat: 37.724,
          lng: -122.44,
          medianPrice: 1250000,
          pricePerSqFt: 820,
          affordabilityRank: 4,
        },
        {
          name: "Crocker-Amazon",
          lat: 37.7138,
          lng: -122.437,
          medianPrice: 1280000,
          pricePerSqFt: 830,
          affordabilityRank: 5,
        },
        {
          name: "Oceanview",
          lat: 37.7189,
          lng: -122.4612,
          medianPrice: 1290000,
          pricePerSqFt: 840,
          affordabilityRank: 6,
        },
        {
          name: "Ingleside",
          lat: 37.7245,
          lng: -122.4567,
          medianPrice: 1310000,
          pricePerSqFt: 860,
          affordabilityRank: 7,
        },
        {
          name: "Tenderloin (Condos)",
          lat: 37.7841,
          lng: -122.4143,
          medianPrice: 650000,
          pricePerSqFt: 880,
          affordabilityRank: "1 (Condos)",
        },
        {
          name: "Outer Sunset",
          lat: 37.7553,
          lng: -122.4941,
          medianPrice: 1450000,
          pricePerSqFt: 950,
          affordabilityRank: 8,
        },
        {
          name: "Outer Richmond",
          lat: 37.7786,
          lng: -122.4892,
          medianPrice: 1520000,
          pricePerSqFt: 970,
          affordabilityRank: 9,
        },
      ],
      heatmap: true,
      legend: {
        title: "Median Home Prices",
        gradient: [
          { color: "#06d6a0", label: "Most Affordable ($650k-$1.1M)" },
          { color: "#118ab2", label: "Moderately Affordable ($1.1M-$1.3M)" },
          { color: "#073b4c", label: "Relatively Affordable ($1.3M-$1.6M)" },
        ],
      },
      cityComparison: [
        { city: "Daly City", medianPrice: 1150000, discount: "22%" },
        { city: "South San Francisco", medianPrice: 1280000, discount: "15%" },
      ],
    },
  },
  {
    id: "q36",
    category: "pricing",
    question:
      "How do San Francisco home prices compare to other Bay Area cities?",
    answer:
      "San Francisco remains among the most expensive real estate markets in the Bay Area with a median home price of approximately $1.52 million, though several Peninsula and South Bay communities now match or exceed this price point. Nearby cities offer varying levels of relative value. Oakland provides significant savings at a median price of $905,000 (40% lower) while still offering urban amenities and convenient commute options. Berkeley commands premium prices ($1.35 million median) due to its cultural amenities and prestigious university. South San Francisco and Daly City offer 15-25% discounts compared to similar San Francisco properties while providing proximity to the city. Moving south along the Peninsula, prices increase substantially in exclusive communities like Atherton (median $7.9 million), Palo Alto ($3.65 million), and Los Altos ($3.85 million), which all substantially exceed San Francisco's averages. The North Bay presents more affordable options with Novato ($1.15 million) and Vallejo ($600,000) offering significant savings but longer commutes. East Bay communities like Fremont ($1.45 million) and Pleasanton ($1.7 million) balance good schools and amenities with somewhat more attainable prices. These regional price variations reflect differing commute times, school quality, lot sizes, and community amenities, with San Francisco commanding premiums for its urban lifestyle, employment opportunities, and limited housing supply.",
    artifactType: "chart",
    artifactData: {
      type: "bar",
      title: "Median Home Prices Across Bay Area Cities (2024)",
      xAxis: "City",
      yAxis: "Median Price ($)",
      data: [
        { city: "Atherton", price: 7900000, region: "Peninsula" },
        { city: "Los Altos", price: 3850000, region: "South Bay" },
        { city: "Palo Alto", price: 3650000, region: "Peninsula" },
        { city: "Hillsborough", price: 5200000, region: "Peninsula" },
        { city: "Menlo Park", price: 2950000, region: "Peninsula" },
        { city: "Tiburon", price: 3350000, region: "North Bay" },
        { city: "Sausalito", price: 2100000, region: "North Bay" },
        { city: "San Francisco", price: 1520000, region: "SF" },
        { city: "Mill Valley", price: 2050000, region: "North Bay" },
        { city: "Pleasanton", price: 1700000, region: "East Bay" },
        { city: "Fremont", price: 1450000, region: "East Bay" },
        { city: "Berkeley", price: 1350000, region: "East Bay" },
        { city: "South San Francisco", price: 1280000, region: "Peninsula" },
        { city: "Daly City", price: 1150000, region: "Peninsula" },
        { city: "Novato", price: 1050000, region: "North Bay" },
        { city: "Oakland", price: 905000, region: "East Bay" },
        { city: "Richmond", price: 750000, region: "East Bay" },
        { city: "Vallejo", price: 600000, region: "North Bay" },
      ],
      colorGroups: {
        Peninsula: "#1E88E5",
        "South Bay": "#43A047",
        "East Bay": "#FB8C00",
        "North Bay": "#8E24AA",
        SF: "#F4511E",
      },
      annotations: [
        { text: "San Francisco Median: $1.52M", yValue: 1520000, type: "line" },
      ],
      additionalStats: {
        valueComparison: [
          {
            metric: "Price Per Square Foot",
            values: [
              { city: "San Francisco", value: "$1,050" },
              { city: "Oakland", value: "$580" },
              { city: "Palo Alto", value: "$1,430" },
              { city: "San Jose", value: "$720" },
            ],
          },
          {
            metric: "Lot Size per $1M",
            values: [
              { city: "San Francisco", value: "1,800 sq ft" },
              { city: "Oakland", value: "3,200 sq ft" },
              { city: "Walnut Creek", value: "5,800 sq ft" },
              { city: "Novato", value: "8,200 sq ft" },
            ],
          },
        ],
      },
    },
  },
  {
    id: "q37",
    category: "buying",
    question: "What are the best neighborhoods for first-time buyers?",
    answer:
      "For first-time buyers in San Francisco, several neighborhoods offer a balance of relative affordability, good amenities, and potential for appreciation. Bernal Heights has become a popular first-time buyer destination, offering a village-like atmosphere, sunny microclimate, and a mix of housing styles averaging $1.35-1.6 million for smaller homes. The Outer Sunset provides relatively attainable single-family homes ($1.4-1.6 million) with proximity to Ocean Beach, improving dining options, and good transportation. Bayview-Hunters Point offers the city's most accessible single-family home prices ($950,000-1.15 million) with significant revitalization underway, though buyers should research specific blocks. Excelsior provides solid value with its diverse housing stock, multicultural atmosphere, and median prices around $1.15-1.25 million. For condo buyers, neighborhoods like Dogpatch offer newer construction with amenities at more accessible price points ($850,000-1.1 million), while Mission Bay provides modern buildings with HOA amenities. First-time buyers should also consider factors beyond purchase price, including property tax rates, HOA fees for condos, commute times, and future development plans. Many successful first-time purchases involve compromising on size, condition, or proximity to premium neighborhoods, with 'edge' locations bordering more established areas often providing good value and appreciation potential.",
    artifactType: "table",
    artifactData: {
      title: "Best Neighborhoods for First-Time Buyers in San Francisco",
      columns: [
        "Neighborhood",
        "Property Types",
        "Price Range",
        "First-Time Buyer Appeal",
        "Notable Features",
        "Future Outlook",
      ],
      rows: [
        [
          "Bernal Heights",
          "Small SFH, Some Condos",
          "$1.35M-1.6M",
          "Village feel, Sunny microclimate",
          "Parks, Cortland Ave shops, Good transit",
          "Strong - Established but still growing",
        ],
        [
          "Outer Sunset",
          "SFH, Some Duplexes",
          "$1.4M-1.6M",
          "Beach proximity, Improving amenities",
          "Ocean Beach, Sunset Blvd, Emerging restaurants",
          "Positive - Growing popularity",
        ],
        [
          "Bayview-Hunters Point",
          "SFH, Some New Condos",
          "$950K-1.15M",
          "Most affordable SFHs in SF",
          "Revitalization projects, New developments",
          "Improving - Long-term appreciation potential",
        ],
        [
          "Excelsior",
          "SFH, Some Multi-Units",
          "$1.15M-1.25M",
          "Diverse community, Solid value",
          "Cultural diversity, Mission St corridor",
          "Stable - Gradual improvements",
        ],
        [
          "Portola",
          "SFH, Some Duplexes",
          "$1.2M-1.4M",
          "Under-the-radar value, Family-friendly",
          "McLaren Park, Good highway access",
          "Positive - Increasing attention",
        ],
        [
          "Dogpatch",
          "Condos, Lofts",
          "$850K-1.1M",
          "Newer buildings, Urban feel",
          "Good transit, Waterfront access, Dining",
          "Strong - Continued development",
        ],
        [
          "Mission Bay",
          "Condos",
          "$900K-1.2M",
          "Modern buildings, Amenities",
          "Chase Center, Waterfront, Medical campus",
          "Mixed - Fully built area with good transit",
        ],
        [
          "Inner Richmond",
          "SFH, Condos",
          "$1.4M-1.8M",
          "Central location, Good value",
          "Park proximity, Dining options, Transit",
          "Stable - Consistently desirable",
        ],
        [
          "Sunnyside",
          "SFH",
          "$1.3M-1.5M",
          "Quiet streets, BART access",
          "Glen Park proximity, City College",
          "Improving - Adjacent to hot neighborhoods",
        ],
        [
          "Visitacion Valley",
          "SFH",
          "$1.1M-1.3M",
          "Entry-level pricing, New developments",
          "Schlage Lock development, McLaren Park",
          "Improving - Long-term potential",
        ],
      ],
      firstTimeBuyerTips: [
        "Consider 'edge' locations bordering more established neighborhoods",
        "Research future development projects that could affect values",
        "Factor in additional costs beyond purchase price (HOA, taxes, commute)",
        "Look for neighborhoods with improving restaurant/retail scenes",
        "Consider transit developments that might enhance accessibility",
      ],
    },
  },
  {
    id: "q38",
    category: "buying",
    question: "What should I know about bidding wars in San Francisco?",
    answer:
      "Bidding wars remain a feature of the San Francisco market, though they've moderated from the extreme competition of 2021. Currently, approximately 30-35% of well-priced properties receive multiple offers, with the most competitive segments being turnkey single-family homes in desirable neighborhoods priced under $2 million. Successful competitive bidding requires thorough preparation. Financial readiness is crucial—having a strong pre-approval letter from a reputable local lender and proof of funds for your down payment and closing costs. Consider offering a larger earnest money deposit (3-5% vs. the standard 1-3%) to demonstrate commitment. Understand that non-price terms often determine the winning bid. Sellers typically favor clean offers with fewer contingencies, so consider shortening contingency periods (inspection 5-7 days, financing 14-21 days) or waiving contingencies if you're comfortable with the risks. Pre-inspections, where possible, can give you confidence to waive inspection contingencies. Work with an experienced local agent with strong relationships in the brokerage community, as listing agents often favor offers from buyers represented by agents they know and trust. Finally, develop a clear bidding strategy in advance—know your absolute maximum price and which terms you can flex on versus your non-negotiables.",
    artifactType: "table",
    artifactData: {
      title: "San Francisco Bidding War Strategy Guide",
      sections: [
        {
          heading: "Current Competitive Landscape",
          data: [
            {
              metric: "Properties Receiving Multiple Offers",
              value: "30-35%",
              trend: "Down from 70-80% in 2021",
            },
            {
              metric: "Average Number of Offers on Competitive Properties",
              value: "3-5",
              trend: "Down from 10-15 in 2021",
            },
            {
              metric:
                "Typical Winning Bid Over Asking (Competitive Properties)",
              value: "5-8%",
              trend: "Down from 15-25% in 2021",
            },
            {
              metric: "Most Competitive Property Types",
              value: "Single-Family Homes under $2M in prime areas",
              details: "Especially turnkey condition",
            },
            {
              metric: "Least Competitive Property Types",
              value:
                "Condos with high HOA fees, Homes needing significant work",
              details: "Especially in less central locations",
            },
          ],
        },
        {
          heading: "Financial Preparation",
          items: [
            {
              strategy: "Strong Pre-Approval Letter",
              importance: "Essential",
              notes: "From reputable local lender",
            },
            {
              strategy: "Proof of Funds Documentation",
              importance: "Essential",
              notes: "For down payment and closing costs",
            },
            {
              strategy: "Higher Earnest Money Deposit",
              importance: "Advantageous",
              notes: "3-5% vs. standard 1-3%",
            },
            {
              strategy: "Ability to Cover Appraisal Gaps",
              importance: "Potentially Critical",
              notes: "Be prepared to pay over appraised value",
            },
          ],
        },
        {
          heading: "Offer Terms & Contingencies",
          items: [
            {
              term: "Inspection Contingency",
              competitive: "Shortened (5-7 days) or Waived*",
              standard: "10-17 days",
              risk: "High if waived",
            },
            {
              term: "Financing Contingency",
              competitive: "Shortened (14-21 days) or Waived*",
              standard: "21-30 days",
              risk: "Moderate if waived",
            },
            {
              term: "Appraisal Contingency",
              competitive: "Waived*",
              standard: "Included",
              risk: "Moderate to High",
            },
            {
              term: "Close of Escrow",
              competitive: "21-30 days",
              standard: "30-45 days",
              risk: "Low",
            },
            {
              term: "Free Rent Back for Seller",
              competitive: "Offered if needed",
              standard: "Not offered",
              risk: "Low",
            },
          ],
        },
        {
          heading: "Winning Strategies",
          items: [
            {
              strategy: "Pre-Inspections",
              details:
                "Conduct inspections before making offer to confidently remove contingencies",
            },
            {
              strategy: "Escalation Clauses",
              details:
                "Automatically increase your offer to beat competing bids up to your maximum",
            },
            {
              strategy: "Personal Letter to Seller",
              details:
                "Where legally permitted, explain your connection to the property",
            },
            {
              strategy: "Work with Connected Agent",
              details:
                "Choose an agent with strong relationships in the brokerage community",
            },
            {
              strategy: "Local Lender",
              details:
                "SF listing agents favor local lenders with track records of closing on time",
            },
          ],
          disclaimer:
            "* Waiving contingencies carries significant risk and should only be done with expert guidance and full understanding of potential consequences.",
        },
      ],
    },
  },
  {
    id: "q39",
    category: "neighborhoods",
    question: "What neighborhoods have the best schools?",
    answer:
      "San Francisco's public schools operate under a lottery system rather than neighborhood-based assignment, so technically children from any neighborhood can attend any school. However, certain neighborhoods have clusters of highly-rated public and private schools that make them particularly attractive to families. The western neighborhoods of Sunset and Richmond have several highly-rated public elementary schools, including Lawton Alternative, Jefferson Elementary, and Alice Fong Yu, the nation's first Chinese immersion public school. Noe Valley and adjacent areas are popular with families, with coveted schools like Alvarado Elementary, Fairmount Elementary, and the highly-rated private schools Children's Day School and Adda Clevenger. West Portal/Forest Hill offers access to the well-regarded West Portal Elementary and the prestigious private K-8 San Francisco Day School. Presidio Heights and the northern neighborhoods provide access to top-tier private schools like Town School for Boys, Hamlin School for Girls, and Stuart Hall. Marina and Pacific Heights contain several strong schools, including Claire Lilienthal and Sherman Elementary. For middle and high schools, Lowell High School (selective admission), Ruth Asawa School of the Arts, and Presidio Middle School are among the city's highest performers. When evaluating neighborhoods for schools, consider both public and private options, the logistics of the SFUSD lottery system, and your specific educational priorities.",
    artifactType: "map",
    artifactData: {
      title: "Top School Neighborhoods in San Francisco",
      centerLat: 37.7749,
      centerLng: -122.4194,
      zoom: 12,
      markers: [
        {
          name: "Sunset District",
          lat: 37.7509,
          lng: -122.4856,
          schools: [
            { name: "Lawton Alternative", type: "Public K-8", rating: 9 },
            { name: "Jefferson Elementary", type: "Public K-5", rating: 8 },
            {
              name: "Alice Fong Yu",
              type: "Public K-8 (Chinese Immersion)",
              rating: 9,
            },
          ],
          notes: "Strong public schools, family-friendly environment",
        },
        {
          name: "Noe Valley/Bernal Heights",
          lat: 37.742,
          lng: -122.4255,
          schools: [
            { name: "Alvarado Elementary", type: "Public K-5", rating: 8 },
            {
              name: "Fairmount Elementary",
              type: "Public K-5 (Spanish Immersion)",
              rating: 7,
            },
            {
              name: "Children's Day School",
              type: "Private PreK-8",
              rating: 9,
            },
            { name: "Adda Clevenger", type: "Private K-8", rating: 8 },
          ],
          notes: "Mix of strong public and private options",
        },
        {
          name: "West Portal/Forest Hill",
          lat: 37.7405,
          lng: -122.4663,
          schools: [
            { name: "West Portal Elementary", type: "Public K-5", rating: 9 },
            {
              name: "San Francisco Day School",
              type: "Private K-8",
              rating: 10,
            },
            {
              name: "Commodore Sloat Elementary",
              type: "Public K-5",
              rating: 8,
            },
          ],
          notes: "Quiet residential area with top schools",
        },
        {
          name: "Presidio Heights",
          lat: 37.7896,
          lng: -122.4501,
          schools: [
            { name: "Town School for Boys", type: "Private K-8", rating: 10 },
            {
              name: "Hamlin School for Girls",
              type: "Private K-8",
              rating: 10,
            },
            { name: "Stuart Hall", type: "Private K-8", rating: 9 },
            {
              name: "San Francisco University High School",
              type: "Private 9-12",
              rating: 10,
            },
          ],
          notes: "Concentration of elite private schools",
        },
        {
          name: "Pacific Heights/Marina",
          lat: 37.7925,
          lng: -122.4382,
          schools: [
            { name: "Claire Lilienthal", type: "Public K-8", rating: 9 },
            { name: "Sherman Elementary", type: "Public K-5", rating: 8 },
            { name: "Hamlin School", type: "Private K-8 (Girls)", rating: 10 },
          ],
          notes: "Upscale area with strong school options",
        },
        {
          name: "Richmond District",
          lat: 37.7799,
          lng: -122.4735,
          schools: [
            { name: "Presidio Middle School", type: "Public 6-8", rating: 9 },
            {
              name: "George Peabody Elementary",
              type: "Public K-5",
              rating: 8,
            },
            { name: "Argonne Elementary", type: "Public K-5", rating: 8 },
          ],
          notes: "Family-oriented with solid public schools",
        },
      ],
      specialNotes: [
        "Lowell High School (Selective Public): Citywide competitive admission",
        "Ruth Asawa School of the Arts: Citywide competitive admission",
        "SFUSD Lottery System: Families can apply to schools citywide regardless of residence",
        "Private School Concentration: Northern neighborhoods have highest density of elite private schools",
      ],
    },
  },
  {
    id: "q40",
    category: "neighborhoods",
    question: "What are the safest neighborhoods in San Francisco?",
    answer:
      "Safety in San Francisco, as in most cities, varies by neighborhood and can change block by block. Several areas consistently report lower crime rates and are generally considered the safest in the city. Seacliff, a luxury enclave near the Presidio, has among the lowest crime rates citywide, though its remote location and high prices limit accessibility for most buyers. Presidio Heights, Pacific Heights, and Marina combine safety with central locations and excellent amenities, though home prices typically start above $2 million. West Portal and Forest Hill offer family-friendly environments with low crime rates and a suburban feel while maintaining good transit connections. Noe Valley remains popular for its safety, particularly in its central and southern sections, though property crimes have increased in recent years. Inner and Central Sunset provide a good safety profile with more accessible price points, especially for families. Saint Francis Wood features larger lots and exceptionally low crime rates in a park-like setting. When evaluating neighborhood safety, it's important to distinguish between violent crime (which remains concentrated in specific areas) and property crime (which occurs throughout the city). Most residential areas have low violent crime rates, while property crimes like car break-ins and package theft are more widespread. For the most current safety information, prospective buyers should review recent crime statistics, visit neighborhoods at different times of day, and speak with local residents.",
    artifactType: "map",
    artifactData: {
      title: "Safest Neighborhoods in San Francisco",
      centerLat: 37.7749,
      centerLng: -122.4194,
      zoom: 12,
      heatmap: true,
      markers: [
        {
          name: "Seacliff",
          lat: 37.7868,
          lng: -122.4899,
          crimeIndex: 12,
          medianHomePrice: "$4.2M+",
          notes: "Luxury enclave with lowest crime rates",
        },
        {
          name: "Presidio Heights",
          lat: 37.7896,
          lng: -122.4501,
          crimeIndex: 15,
          medianHomePrice: "$3.8M+",
          notes: "Upscale area with excellent safety",
        },
        {
          name: "Pacific Heights",
          lat: 37.7925,
          lng: -122.4382,
          crimeIndex: 18,
          medianHomePrice: "$2.5M+",
          notes: "Prestigious neighborhood with low crime",
        },
        {
          name: "St. Francis Wood",
          lat: 37.7359,
          lng: -122.4664,
          crimeIndex: 14,
          medianHomePrice: "$2.8M+",
          notes: "Park-like setting with larger lots",
        },
        {
          name: "West Portal",
          lat: 37.7405,
          lng: -122.4663,
          crimeIndex: 20,
          medianHomePrice: "$1.8M+",
          notes: "Family-friendly with village atmosphere",
        },
        {
          name: "Forest Hill",
          lat: 37.7464,
          lng: -122.4681,
          crimeIndex: 16,
          medianHomePrice: "$2.2M+",
          notes: "Quiet, tree-lined streets with low crime",
        },
        {
          name: "Marina",
          lat: 37.8015,
          lng: -122.4351,
          crimeIndex: 22,
          medianHomePrice: "$2.3M+",
          notes: "Popular area with good safety profile",
        },
        {
          name: "Noe Valley",
          lat: 37.7502,
          lng: -122.4337,
          crimeIndex: 24,
          medianHomePrice: "$2.1M+",
          notes: "Family-oriented with moderate crime",
        },
        {
          name: "Inner Sunset",
          lat: 37.7601,
          lng: -122.4689,
          crimeIndex: 26,
          medianHomePrice: "$1.7M+",
          notes: "Safe area near Golden Gate Park",
        },
        {
          name: "Central Richmond",
          lat: 37.7786,
          lng: -122.4738,
          crimeIndex: 28,
          medianHomePrice: "$1.6M+",
          notes: "Quiet residential area with good safety",
        },
      ],
      legend: {
        title: "Crime Index (Lower is Better)",
        scale: [
          { range: "10-20", label: "Very Low Crime", color: "#008000" },
          { range: "21-30", label: "Low Crime", color: "#90EE90" },
          { range: "31-50", label: "Moderate Crime", color: "#FFFF00" },
          { range: "51-70", label: "High Crime", color: "#FFA500" },
          { range: "71-100", label: "Very High Crime", color: "#FF0000" },
        ],
      },
      safetyNotes: [
        "Property crime (car break-ins, package theft) occurs throughout the city",
        "Violent crime is more concentrated in specific areas",
        "Safety can vary significantly block by block",
        "Visit neighborhoods at different times of day before making decisions",
        "Check current crime statistics at www.sanfranciscopolice.org/stats",
      ],
    },
  },
  {
    id: "q41",
    category: "mortgage",
    question: "What are the typical closing costs in San Francisco?",
    answer:
      "Closing costs in San Francisco typically range from 2-5% of the purchase price, which translates to $30,000-$75,000 on a median-priced $1.5 million home. For buyers, major costs include loan-related expenses such as origination fees (0.5-1% of loan amount), discount points (optional, each point costs 1% of loan amount to reduce interest rate), and appraisal fees ($500-$750). Title-related costs include title insurance ($3,000-$7,000 for a $1.5 million property), escrow fees ($2,000-$3,000), and recording fees ($100-$200). Buyers also pay prepaid items such as property taxes (typically 2-6 months in advance), homeowners insurance (12 months upfront), and mortgage interest from closing until the first regular payment. Additional expenses may include home inspection fees ($500-$1,500 depending on inspections needed), HOA transfer fees for condominiums ($300-$700), and natural hazard disclosure reports ($125-$200). Unlike many areas, San Francisco has a transfer tax ($6.80 per $1,000 for properties over $250,000), though it's traditionally paid by the seller. Unique to San Francisco are costs related to the 3R report (Report of Residential Building Record) and potential seismic retrofit certifications. Your lender will provide a Loan Estimate within three days of application detailing expected costs, and a final Closing Disclosure at least three days before closing.",
    artifactType: "chart",
    artifactData: {
      type: "pie",
      title: "Typical Buyer's Closing Costs for $1.5M San Francisco Home",
      data: [
        {
          category: "Loan Origination Fees",
          value: 11250,
          description: "Lender fees (0.75% of loan amount)",
          percentage: 28.1,
        },
        {
          category: "Title Insurance",
          value: 5000,
          description: "Protection against property ownership issues",
          percentage: 12.5,
        },
        {
          category: "Escrow Fees",
          value: 2500,
          description: "Third-party handling of transaction",
          percentage: 6.3,
        },
        {
          category: "Prepaid Property Taxes",
          value: 9375,
          description: "6 months property tax in advance",
          percentage: 23.4,
        },
        {
          category: "Prepaid Insurance",
          value: 2500,
          description: "12 months homeowners insurance",
          percentage: 6.3,
        },
        {
          category: "Prepaid Interest",
          value: 2000,
          description: "Interest from closing until first payment",
          percentage: 5.0,
        },
        {
          category: "Home Inspection Fees",
          value: 1200,
          description: "General, pest, specialized inspections",
          percentage: 3.0,
        },
        {
          category: "Appraisal Fee",
          value: 750,
          description: "Professional property valuation",
          percentage: 1.9,
        },
        {
          category: "Local Reports & Fees",
          value: 425,
          description: "3R Report, hazard disclosures, etc.",
          percentage: 1.1,
        },
        {
          category: "Recording Fees",
          value: 150,
          description: "County recording of documents",
          percentage: 0.4,
        },
        {
          category: "Miscellaneous Fees",
          value: 4850,
          description: "Wire transfers, notary, etc.",
          percentage: 12.1,
        },
      ],
      total: 40000,
      sellerCosts: {
        title: "Typical Seller's Closing Costs",
        items: [
          { name: "Real Estate Commission", typical: "5-6% of sale price" },
          {
            name: "Transfer Tax",
            typical: "$6.80 per $1,000 (for properties over $250K)",
          },
          {
            name: "Title Insurance (Owner's Policy)",
            typical: "$2,500-$5,000",
          },
          { name: "Escrow Fees", typical: "Split with buyer ($1,500-$2,500)" },
          {
            name: "Prorated Property Taxes",
            typical: "Varies by closing date",
          },
          { name: "HOA Transfer Fees", typical: "$300-$700 for condos" },
        ],
      },
    },
  },
  {
    id: "q42",
    category: "process",
    question: "What does the home buying process look like step by step?",
    answer:
      "The home buying process in San Francisco typically begins with financial preparation. Assess your finances, check your credit, and get pre-approved for a mortgage to determine your budget. This pre-approval letter will be essential when making offers. Next, clarify your needs versus wants in a property and select an experienced local real estate agent familiar with San Francisco's unique market dynamics. The house hunting phase involves viewing properties both online and in person, with your agent providing guidance on neighborhood characteristics, potential issues, and comparative values. When you find a suitable property, your agent will help prepare a competitive offer based on comparable sales, current market conditions, and the property's condition. In San Francisco, this often involves strategizing on price, contingencies, and terms to make your offer stand out. After acceptance, the escrow period begins, typically lasting 30-45 days. During this time, you'll conduct inspections (general home inspection, pest inspection, and specialized inspections as needed), review disclosures, and secure final mortgage approval. The lender will require an appraisal to verify the property's value. Once all contingencies are removed and financing is secured, you'll conduct a final walkthrough to verify the property's condition. At closing, you'll sign final paperwork, wire your down payment and closing costs, and receive the keys to your new home. Throughout this process, working with experienced professionals familiar with San Francisco's unique market will help navigate challenges specific to the city.",
    artifactType: "flowchart",
    artifactData: {
      title: "San Francisco Home Buying Process",
      steps: [
        {
          id: 1,
          text: "Financial Preparation",
          description: "Check credit, assess finances, determine budget",
        },
        {
          id: 2,
          text: "Mortgage Pre-Approval",
          description: "Get formal pre-approval from a lender",
        },
        {
          id: 3,
          text: "Define Requirements",
          description:
            "Determine needs vs. wants, neighborhoods, property types",
        },
        {
          id: 4,
          text: "Select Agent",
          description: "Find experienced San Francisco agent",
        },
        {
          id: 5,
          text: "House Hunting",
          description: "View properties online and in person",
        },
        {
          id: 6,
          text: "Prepare Offer",
          description: "Determine price, contingencies, terms",
        },
        {
          id: 7,
          text: "Offer Acceptance",
          description: "Negotiate terms, reach agreement",
        },
        {
          id: 8,
          text: "Open Escrow",
          description: "Deposit earnest money, typically 3%",
        },
        {
          id: 9,
          text: "Inspections",
          description: "General, pest, specialized as needed",
        },
        {
          id: 10,
          text: "Review Disclosures",
          description: "Transfer disclosure statement, 3R report, etc.",
        },
        {
          id: 11,
          text: "Remove Contingencies",
          description: "Inspection, financing, appraisal contingencies",
        },
        {
          id: 12,
          text: "Secure Final Loan Approval",
          description: "Submit final documentation to lender",
        },
        {
          id: 13,
          text: "Final Walkthrough",
          description: "Verify property condition before closing",
        },
        {
          id: 14,
          text: "Close Escrow",
          description: "Sign documents, transfer funds",
        },
        {
          id: 15,
          text: "Take Possession",
          description: "Receive keys to your new home",
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
        [10, 11],
        [11, 12],
        [12, 13],
        [13, 14],
        [14, 15],
      ],
      sfSpecifics: [
        {
          step: "Prepare Offer",
          note: "SF often requires competitive bidding strategies",
        },
        {
          step: "Inspections",
          note: "Older SF housing stock may require specialized inspections",
        },
        {
          step: "Review Disclosures",
          note: "SF has unique disclosure requirements like 3R reports",
        },
        {
          step: "Remove Contingencies",
          note: "Competitive SF market often requires shorter contingency periods",
        },
      ],
      timeEstimates: {
        preApproval: "1-2 weeks",
        househunting: "1-3 months (typical)",
        escrowPeriod: "30-45 days",
        totalProcess: "2-6 months on average",
      },
    },
  },
  {
    id: "q43",
    category: "process",
    question: "What inspections should I get before buying?",
    answer:
      "In San Francisco, several key inspections are recommended before purchasing a home due to the city's unique housing stock and environmental conditions. A general home inspection is the foundation, covering structural elements, major systems (electrical, plumbing, heating), roofing, and visible insulation. Given San Francisco's seismic activity, a specific foundation/structural inspection is often advisable, particularly for homes built before modern earthquake codes were implemented. Pest inspections (termite/dry rot) are crucial in San Francisco's climate, where fog and moisture can contribute to wood damage. For older homes (pre-1978), consider lead paint and asbestos testing, as these materials were commonly used in the city's historic housing. Sewer lateral inspections using video scoping can identify issues with aging clay pipes that are common in older neighborhoods. Chimney inspections are important for Victorian and Edwardian homes, as unreinforced masonry presents seismic risks. Electrical inspections should evaluate knob-and-tube wiring or aluminum wiring in older properties. For hillside properties, drainage and soils inspections can identify potential erosion or stability issues. When purchasing condominiums, have your inspector review HOA documents and evaluate common areas. The timing of inspections is important—in competitive situations, pre-offer inspections may be necessary, while in other cases, they're conducted during the contingency period. Factor in approximately $1,000-$2,500 for a comprehensive inspection package, with costs varying based on property size and specific inspections needed.",
    artifactType: "checklist",
    artifactData: {
      title: "Essential San Francisco Home Inspections Checklist",
      categories: [
        {
          name: "Standard Inspections",
          items: [
            {
              item: "General Home Inspection",
              cost: "$500-$750",
              importance: "Essential",
              sfSpecific: "Focus on seismic vulnerabilities, drainage issues",
            },
            {
              item: "Pest Inspection (Termite/Dry Rot)",
              cost: "$250-$400",
              importance: "Essential",
              sfSpecific: "Fog belt moisture issues increase importance",
            },
            {
              item: "Sewer Lateral Video Inspection",
              cost: "$300-$500",
              importance: "Highly Recommended",
              sfSpecific: "Aging clay pipes common in older neighborhoods",
            },
            {
              item: "Roof Inspection",
              cost: "$200-$500",
              importance: "Recommended",
              sfSpecific: "Flat roofs common in SF require special attention",
            },
          ],
        },
        {
          name: "Structural & Seismic",
          items: [
            {
              item: "Foundation/Structural Inspection",
              cost: "$500-$800",
              importance: "Highly Recommended",
              sfSpecific: "Seismic activity makes this crucial",
            },
            {
              item: "Drainage & Soils (Hillside Properties)",
              cost: "$500-$750",
              importance: "Situational",
              sfSpecific: "Critical for properties on slopes",
            },
            {
              item: "Seismic Retrofit Assessment",
              cost: "$300-$500",
              importance: "Recommended",
              sfSpecific: "Evaluate earthquake preparedness",
            },
            {
              item: "Retaining Wall Inspection",
              cost: "$400-$600",
              importance: "Situational",
              sfSpecific: "Important for hillside properties",
            },
          ],
        },
        {
          name: "Environmental & Health",
          items: [
            {
              item: "Lead Paint Testing",
              cost: "$300-$500",
              importance: "Recommended for pre-1978",
              sfSpecific: "Common in Victorian/Edwardian homes",
            },
            {
              item: "Asbestos Testing",
              cost: "$400-$800",
              importance: "Recommended for pre-1980",
              sfSpecific: "Often found in older heating systems, insulation",
            },
            {
              item: "Mold Inspection",
              cost: "$300-$600",
              importance: "Situational",
              sfSpecific: "Fog belt areas have higher risk",
            },
            {
              item: "Radon Testing",
              cost: "$150-$300",
              importance: "Optional",
              sfSpecific: "Less common issue in SF than other regions",
            },
          ],
        },
        {
          name: "Systems & Utilities",
          items: [
            {
              item: "Electrical System Inspection",
              cost: "$200-$400",
              importance: "Highly Recommended",
              sfSpecific: "Check for knob-and-tube wiring in older homes",
            },
            {
              item: "HVAC System Inspection",
              cost: "$200-$400",
              importance: "Recommended",
              sfSpecific: "Many older homes lack central heating",
            },
            {
              item: "Chimney Inspection",
              cost: "$250-$500",
              importance: "Situational",
              sfSpecific: "Unreinforced masonry chimneys are seismic risks",
            },
            {
              item: "Water Pressure/Plumbing",
              cost: "$200-$350",
              importance: "Recommended",
              sfSpecific: "Hillside homes may have pressure issues",
            },
          ],
        },
        {
          name: "Condominium Specific",
          items: [
            {
              item: "HOA Document Review",
              cost: "$350-$600",
              importance: "Essential for Condos",
              sfSpecific: "Review reserves, litigation, special assessments",
            },
            {
              item: "Common Area Inspection",
              cost: "Included in general",
              importance: "Essential for Condos",
              sfSpecific: "Evaluate building envelope, foundation",
            },
            {
              item: "Shared Systems Evaluation",
              cost: "Varies",
              importance: "Essential for Condos",
              sfSpecific: "Boilers, elevators, garage, roof",
            },
            {
              item: "Noise Transmission Testing",
              cost: "$300-$500",
              importance: "Optional",
              sfSpecific: "Valuable for converted buildings",
            },
          ],
        },
      ],
      inspectionTiming: [
        {
          scenario: "Competitive Market/Multiple Offers",
          approach: "Pre-Offer Inspections",
          pros: "Allows non-contingent offers",
          cons: "Upfront cost with no guarantee of accepted offer",
        },
        {
          scenario: "Standard Process",
          approach: "Post-Acceptance (Contingency Period)",
          pros: "Only pay for inspections on accepted offer",
          cons: "Less competitive in multiple offer situations",
        },
        {
          scenario: "New Construction",
          approach: "Pre-Closing Walkthrough + 11-Month Warranty Inspection",
          pros: "Builder warranty coverage",
          cons: "May miss issues behind finished surfaces",
        },
      ],
      inspectorTips: [
        "Choose inspectors familiar with San Francisco's unique housing stock",
        "Attend inspections in person to ask questions and understand findings",
        "Prioritize inspections based on property age, type, and location",
        "Budget $1,000-$2,500 for comprehensive inspection package",
        "Use inspection findings for negotiation and future maintenance planning",
      ],
    },
  },
  {
    id: "q44",
    category: "process",
    question: "Should I get a home inspection?",
    answer:
      "Yes, getting a home inspection is strongly recommended when buying in San Francisco, regardless of the property's age or apparent condition. The city's unique housing stock—with many homes built before modern building codes were established—presents specific challenges that make professional inspection particularly important. A thorough home inspection will evaluate the property's structural integrity, foundation, roof, electrical and plumbing systems, heating, insulation, and visible signs of water damage or pest infestation. In San Francisco, special attention should be paid to seismic considerations, foundation issues (especially on hillside properties), drainage problems, aging infrastructure, and outdated electrical systems like knob-and-tube wiring. While the competitive market sometimes pressures buyers to waive inspection contingencies, it's rarely advisable to skip the inspection entirely. If necessary to remain competitive, consider conducting a pre-offer inspection or shortened inspection contingency period rather than forgoing this crucial step. Even newer properties can have issues—sometimes significant ones—that aren't visible to the untrained eye. The cost of a comprehensive inspection ($500-750 for most San Francisco homes) is minimal compared to the potential expense of undiscovered problems. Beyond identifying immediate repair needs, an inspection provides valuable information about future maintenance requirements and can serve as a negotiation tool if significant issues are discovered. When selecting an inspector, look for someone with specific experience with San Francisco properties and their common challenges.",
    artifactType: "table",
    artifactData: {
      title: "Home Inspection Decision Guide for San Francisco Buyers",
      columns: [
        "Consideration",
        "With Professional Inspection",
        "Without Professional Inspection",
        "San Francisco Specifics",
      ],
      rows: [
        [
          "Identifying Hidden Issues",
          "Professional evaluation of structural, mechanical, electrical, and plumbing systems",
          "Reliance on visible conditions and seller disclosures only",
          "SF's older housing stock often has hidden issues like knob-and-tube wiring, foundation settling, and seismic vulnerabilities",
        ],
        [
          "Cost",
          "$500-$750 for standard inspection; Additional specialized inspections $200-$500 each",
          "$0 upfront savings",
          "SF inspections typically more expensive due to complexity of older structures",
        ],
        [
          "Risk Level",
          "Significantly reduced risk of unexpected major repairs",
          "High risk of undiscovered issues leading to costly repairs",
          "Hillside homes, Victorian/Edwardian architecture, and seismic factors increase risks",
        ],
        [
          "Competitive Offers",
          "May make offer less competitive in multiple-bid situations",
          "Can strengthen offer in competitive situations",
          "SF's competitive market sometimes incentivizes waiving contingencies",
        ],
        [
          "Negotiating Power",
          "Provides documented issues for repair requests or price adjustments",
          "No formal basis for requesting repairs or price adjustments",
          "Documentation is crucial for negotiations in SF's high-value market",
        ],
        [
          "Future Planning",
          "Creates checklist of maintenance items and timeline for future repairs",
          "No professional guidance on maintenance priorities",
          "Understanding maintenance needs crucial for budgeting in high-cost SF repair market",
        ],
        [
          "Peace of Mind",
          "Professional confirmation of property condition",
          "Uncertainty about true condition of major systems",
          "High investment values in SF make peace of mind particularly valuable",
        ],
      ],
      strategiesForCompetitiveMarkets: [
        {
          strategy: "Pre-Offer Inspection",
          description: "Conduct inspection before making offer",
          pros: "Allows non-contingent offer while still getting professional assessment",
          cons: "Cost with no guarantee of accepted offer; Limited time to arrange",
        },
        {
          strategy: "Shortened Contingency",
          description:
            "Request 3-5 day inspection period instead of standard 7-10",
          pros: "More competitive than standard contingency while maintaining protection",
          cons: "Rushed timeline for inspections and decisions",
        },
        {
          strategy: "Information-Only Inspection",
          description: "Include inspection but waive right to request repairs",
          pros: "Knowledge about property condition without impacting competitiveness",
          cons: "No negotiating leverage if issues discovered",
        },
        {
          strategy: "Pass-Through Inspection",
          description:
            "Review seller's inspection reports instead of ordering new ones",
          pros: "Cost savings; Faster process",
          cons: "Less control over inspector selection and scope",
        },
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
  pricing: questionsData.filter((q) => q.category === "pricing"),
  buying: questionsData.filter((q) => q.category === "buying"),
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
