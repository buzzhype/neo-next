"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Heart,
  Star,
  X,
  Share2,
  MapPin,
  Home,
  Bed,
  Bath,
  Square,
  Search,
  Sliders,
  Filter,
  Map,
  Grid,
  ChevronDown,
  ArrowUpDown,
  Calendar,
  Clock,
} from "lucide-react";

interface DiscoverProps {
  userProfile: any;
}

// Property images (base64 would be here, using placeholder URLs for brevity)
const propertyImages = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1592595896551-12b371d546d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
];

// Interior images for property details
const interiorImages = [
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
  "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
];

// Property features for enhanced detail view
const propertyFeatures = [
  "Hardwood Floors",
  "Renovated Kitchen",
  "In-Unit Laundry",
  "Central Heating",
  "Balcony",
  "High Ceilings",
  "Stainless Appliances",
  "Dishwasher",
  "Walk-in Closet",
  "Natural Light",
  "Fireplace",
  "Double Pane Windows",
  "Garage Parking",
  "Pet Friendly",
  "Rooftop Access",
  "Doorman",
  "Private Entrance",
  "Storage Space",
];

// Neighborhood amenities
const neighborhoodAmenities = [
  { name: "Grocery Stores", distance: "0.2 miles" },
  { name: "Restaurants", distance: "0.1 miles" },
  { name: "Public Transit", distance: "0.3 miles" },
  { name: "Parks", distance: "0.4 miles" },
  { name: "Schools", distance: "0.5 miles" },
  { name: "Cafes", distance: "0.2 miles" },
];

// Mock property data based on user profile
const generateMockListings = (userProfile: any) => {
  const listings = [];
  const neighborhoods = [
    "Noe Valley",
    "Mission District",
    "SOMA",
    "Marina",
    "Pacific Heights",
    "Richmond",
    "Sunset",
    "Hayes Valley",
    "Dogpatch",
    "Lower Haight",
    "Castro",
    "Potrero Hill",
    "Russian Hill",
    "North Beach",
  ];
  const streetNames = [
    "Main St",
    "Oak Ave",
    "Market St",
    "Pine St",
    "Valencia St",
    "Irving St",
    "Divisadero St",
    "Castro St",
    "Hayes St",
    "Union St",
    "Chestnut St",
    "Bryant St",
    "Folsom St",
    "Van Ness Ave",
  ];

  // Generate 15 properties
  for (let i = 1; i <= 15; i++) {
    const neighborhood =
      neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    const street = `${Math.floor(Math.random() * 2000)} ${
      streetNames[Math.floor(Math.random() * streetNames.length)]
    }`;
    const beds = userProfile.beds
      ? parseInt(userProfile.beds)
      : Math.floor(Math.random() * 3) + 1;
    const baths = userProfile.baths
      ? parseFloat(userProfile.baths)
      : Math.floor(Math.random() * 3) + 1;

    // Calculate price based on user profile or random
    let basePrice = userProfile.budget || 850000;
    const priceVariation = basePrice * 0.2; // 20% variation
    const price =
      Math.round(
        (basePrice - priceVariation / 2 + Math.random() * priceVariation) /
          1000,
      ) * 1000;

    // Random square footage
    const sqft = Math.floor(Math.random() * 1000) + 700;

    // Select random property image
    const imageIndex = Math.floor(Math.random() * propertyImages.length);

    // Generate random tags based on property characteristics
    const possibleTags = [
      "New Listing",
      "Open House Sunday",
      "Price Reduced",
      "Hot Property",
      "Just Listed",
      "Exclusive",
    ];
    const tags = [];

    // Add 0-2 random tags
    const numTags = Math.floor(Math.random() * 3);
    for (let j = 0; j < numTags; j++) {
      const tagIndex = Math.floor(Math.random() * possibleTags.length);
      tags.push(possibleTags[tagIndex]);
      // Remove the tag so we don't duplicate
      possibleTags.splice(tagIndex, 1);
    }

    // Interior images for property details
    const propertyInteriorImages = [];
    // Select 3-5 random interior images
    const numInteriorImages = Math.floor(Math.random() * 3) + 3;
    for (let k = 0; k < numInteriorImages; k++) {
      propertyInteriorImages.push(
        interiorImages[Math.floor(Math.random() * interiorImages.length)],
      );
    }

    // Select 4-8 random property features
    const selectedFeatures = [];
    const featuresCopy = [...propertyFeatures];
    const numFeatures = Math.floor(Math.random() * 5) + 4;
    for (let m = 0; m < numFeatures; m++) {
      if (featuresCopy.length === 0) break;
      const featureIndex = Math.floor(Math.random() * featuresCopy.length);
      selectedFeatures.push(featuresCopy[featureIndex]);
      featuresCopy.splice(featureIndex, 1);
    }

    // Calculate match score based on user preferences
    let matchScore = Math.floor(Math.random() * 30) + 70; // Base score 70-100

    // Adjust match score based on user preferences if available
    if (userProfile) {
      // Better match if beds match preference
      if (userProfile.beds && beds >= parseInt(userProfile.beds)) {
        matchScore += 5;
      }

      // Better match if baths match preference
      if (userProfile.baths && baths >= parseFloat(userProfile.baths)) {
        matchScore += 5;
      }

      // Better match if property type matches preference
      if (
        userProfile.propertyType &&
        userProfile.propertyType.toLowerCase() ===
          (Math.random() > 0.5 ? "condo" : "single family home").toLowerCase()
      ) {
        matchScore += 10;
      }

      // Cap at 100
      matchScore = Math.min(matchScore, 100);
    }

    listings.push({
      id: `prop-${i}`,
      address: `${street}`,
      neighborhood: neighborhood,
      city: "San Francisco",
      price: price,
      beds: beds,
      baths: baths,
      sqft: sqft,
      propertyType:
        userProfile.propertyType ||
        (Math.random() > 0.5 ? "Condo" : "Single Family Home"),
      yearBuilt: Math.floor(Math.random() * 70) + 1950,
      image: propertyImages[imageIndex],
      interiorImages: propertyInteriorImages,
      favorite: false,
      tags: tags,
      features: selectedFeatures,
      matchScore: matchScore,
      walkScore: Math.floor(Math.random() * 30) + 70,
      transitScore: Math.floor(Math.random() * 40) + 60,
      daysOnMarket: Math.floor(Math.random() * 30) + 1,
      virtualTour: Math.random() > 0.7,
      openHouse: Math.random() > 0.7 ? "Sunday, 2-4 PM" : null,
      neighborhood_amenities: neighborhoodAmenities,
      description: `Beautiful ${beds} bedroom, ${baths} bathroom ${
        Math.random() > 0.5 ? "condo" : "single-family home"
      } in the heart of ${neighborhood}. This property features ${selectedFeatures
        .slice(0, 3)
        .join(", ")}, and more. Built in ${
        Math.floor(Math.random() * 70) + 1950
      } and recently renovated, it offers modern amenities while maintaining its original charm.`,
    });
  }

  // Sort by match score descending
  return listings.sort((a, b) => b.matchScore - a.matchScore);
};

const Discover: React.FC<DiscoverProps> = ({ userProfile }) => {
  const [listings, setListings] = useState<any[]>([]);
  const [filteredListings, setFilteredListings] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("recommended");
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortMethod, setSortMethod] = useState<string>("match");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);

  // Categories for filtering
  const categories = [
    { id: "recommended", label: "Recommended" },
    { id: "new", label: "New Listings" },
    { id: "open", label: "Open Houses" },
    { id: "reduced", label: "Price Reduced" },
    { id: "luxury", label: "Luxury Homes" },
    { id: "pet-friendly", label: "Pet Friendly" },
  ];

  // Sort options
  const sortOptions = [
    { id: "match", label: "Best Match" },
    { id: "price-low", label: "Price (Low to High)" },
    { id: "price-high", label: "Price (High to Low)" },
    { id: "newest", label: "Newest" },
    { id: "beds", label: "Most Beds" },
    { id: "sqft", label: "Largest" },
  ];

  useEffect(() => {
    // Simulate loading delay
    setLoading(true);
    setTimeout(() => {
      const generatedListings = generateMockListings(userProfile);
      setListings(generatedListings);
      setFilteredListings(generatedListings);
      setLoading(false);
    }, 1500);
  }, [userProfile]);

  // Effect to filter and sort listings based on category, search, and sort method
  useEffect(() => {
    if (listings.length === 0) return;

    let result = [...listings];

    // Filter by category
    if (activeCategory === "new") {
      result = result.filter((listing) => listing.daysOnMarket <= 7);
    } else if (activeCategory === "open") {
      result = result.filter((listing) => listing.openHouse !== null);
    } else if (activeCategory === "reduced") {
      result = result.filter((listing) =>
        listing.tags.includes("Price Reduced"),
      );
    } else if (activeCategory === "luxury") {
      result = result.filter((listing) => listing.price >= 1500000);
    } else if (activeCategory === "pet-friendly") {
      result = result.filter((listing) =>
        listing.features.includes("Pet Friendly"),
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (listing) =>
          listing.address.toLowerCase().includes(query) ||
          listing.neighborhood.toLowerCase().includes(query) ||
          listing.propertyType.toLowerCase().includes(query),
      );
    }

    // Sort listings
    if (sortMethod === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortMethod === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortMethod === "newest") {
      result.sort((a, b) => a.daysOnMarket - b.daysOnMarket);
    } else if (sortMethod === "beds") {
      result.sort((a, b) => b.beds - a.beds);
    } else if (sortMethod === "sqft") {
      result.sort((a, b) => b.sqft - a.sqft);
    } else {
      // Default: sort by match score
      result.sort((a, b) => b.matchScore - a.matchScore);
    }

    setFilteredListings(result);
  }, [listings, activeCategory, searchQuery, sortMethod]);

  // Function to toggle favorite status
  const toggleFavorite = (id: string) => {
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === id
          ? { ...listing, favorite: !listing.favorite }
          : listing,
      ),
    );

    // Also update in filtered listings to maintain UI consistency
    setFilteredListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === id
          ? { ...listing, favorite: !listing.favorite }
          : listing,
      ),
    );
  };

  // Function to toggle property for comparison
  const toggleCompare = (id: string) => {
    setComparisonList((prev) =>
      prev.includes(id)
        ? prev.filter((propId) => propId !== id)
        : prev.length < 3
          ? [...prev, id]
          : prev,
    );
  };

  // Function to format price
  const formatPrice = (price: number) => {
    return price >= 1000000
      ? `$${(price / 1000000).toFixed(1)}M`
      : `$${(price / 1000).toFixed(0)}K`;
  };

  // Show full details when a listing is selected
  const openListingDetails = (listing: any) => {
    setSelectedListing(listing);
    setActiveImageIndex(0); // Reset image carousel
  };

  // Next image in carousel
  const nextImage = () => {
    if (selectedListing) {
      const totalImages = selectedListing.interiorImages.length + 1; // +1 for main image
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }
  };

  // Previous image in carousel
  const prevImage = () => {
    if (selectedListing) {
      const totalImages = selectedListing.interiorImages.length + 1;
      setActiveImageIndex(
        (prevIndex) => (prevIndex - 1 + totalImages) % totalImages,
      );
    }
  };

  // Get current image for the carousel
  const getCurrentImage = () => {
    if (!selectedListing) return "";
    if (activeImageIndex === 0) {
      return selectedListing.image;
    }
    return selectedListing.interiorImages[activeImageIndex - 1];
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-100">
      {/* Header with search and filters */}
      <div className="bg-white shadow-sm p-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Compass className="w-6 h-6 mr-2 text-blue-600" />
              Discover
            </h1>
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search neighborhoods, addresses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowSortOptions(!showSortOptions)}
                  className="flex items-center gap-1 p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <ArrowUpDown className="w-5 h-5 text-gray-600" />
                  <span className="text-sm hidden sm:inline">Sort</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Sort options dropdown */}
                {showSortOptions && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortMethod(option.id);
                            setShowSortOptions(false);
                          }}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            sortMethod === option.id
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>

              {/* View toggle */}
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1 rounded ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-gray-800"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label="List view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`p-1 rounded ${
                    viewMode === "map"
                      ? "bg-white shadow-sm text-gray-800"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  aria-label="Map view"
                >
                  <Map className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Results count */}
            <div className="ml-auto text-sm text-gray-500">
              {filteredListings.length}{" "}
              {filteredListings.length === 1 ? "result" : "results"}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-7xl mx-auto">
          {viewMode === "list" ? (
            loading ? (
              // Loading state
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((placeholder) => (
                  <div
                    key={placeholder}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 animate-pulse"
                  >
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                      <div className="flex gap-4 mt-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredListings.length === 0 ? (
              // No results state
              <div className="my-12 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No matches found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("recommended");
                    setSortMethod("match");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              // Property listing grid
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer relative group"
                    onClick={() => openListingDetails(listing)}
                  >
                    {/* Comparison checkbox */}
                    <div className="absolute top-3 left-3 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(listing.id);
                        }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          comparisonList.includes(listing.id)
                            ? "bg-blue-600 text-white"
                            : "bg-white/80 hover:bg-white text-gray-600"
                        }`}
                      >
                        {comparisonList.includes(listing.id) ? (
                          <span className="text-xs">✓</span>
                        ) : (
                          <span className="text-xs">+</span>
                        )}
                      </button>
                    </div>
                    <div className="relative">
                      <img
                        src={listing.image}
                        alt={`${listing.address}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(listing.id);
                        }}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            listing.favorite
                              ? "fill-red-500 text-red-500"
                              : "text-gray-500"
                          }`}
                        />
                      </button>

                      {/* Virtual tour badge */}
                      {listing.virtualTour && (
                        <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                          <Compass className="w-3 h-3" />
                          3D Tour
                        </div>
                      )}

                      {/* Match score badge */}
                      <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-lg text-sm font-medium flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {listing.matchScore}% Match
                      </div>

                      {/* Property tags */}
                      {listing.tags && listing.tags.length > 0 && (
                        <div className="absolute top-3 left-12 flex flex-col gap-2">
                          {listing.tags.map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-gray-500 text-sm mb-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {listing.neighborhood}

                        {/* Days on market badge */}
                        <span className="ml-auto flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {listing.daysOnMarket}{" "}
                          {listing.daysOnMarket === 1 ? "day" : "days"}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {formatPrice(listing.price)}
                      </h3>
                      <p className="text-gray-700 text-sm mt-1">
                        {listing.address}
                      </p>
                      <div className="flex gap-4 mt-3">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Bed className="w-4 h-4 mr-1" />
                          {listing.beds} bd
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Bath className="w-4 h-4 mr-1" />
                          {listing.baths} ba
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Square className="w-4 h-4 mr-1" />
                          {listing.sqft.toLocaleString()} sqft
                        </div>
                      </div>

                      {/* Open house info if available */}
                      {listing.openHouse && (
                        <div className="mt-3 flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-1 text-blue-600" />
                          <span className="text-blue-600 font-medium">
                            Open House: {listing.openHouse}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          ) : (
            // Map view
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 h-[calc(100vh-200px)]">
              <div className="p-6 flex items-center justify-center h-full bg-gray-100">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Map View Coming Soon
                  </h3>
                  <p className="text-gray-500">
                    This feature is under development.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison footer */}
      {comparisonList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 p-4 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">
                Compare ({comparisonList.length}/3):
              </span>
              <div className="flex gap-2">
                {comparisonList.map((id) => {
                  const property = listings.find(
                    (listing) => listing.id === id,
                  );
                  return property ? (
                    <div
                      key={id}
                      className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md"
                    >
                      <span className="text-sm text-gray-700 truncate max-w-[100px]">
                        {property.address}
                      </span>
                      <button onClick={() => toggleCompare(id)}>
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            <button
              className={`px-4 py-2 rounded-lg ${
                comparisonList.length < 2
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={comparisonList.length < 2}
            >
              Compare Properties
            </button>
          </div>
        </div>
      )}

      {/* Detailed listing modal */}
      <AnimatePresence>
        {selectedListing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={() => setSelectedListing(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Image carousel */}
                <div className="relative h-72 sm:h-96">
                  <img
                    src={getCurrentImage()}
                    alt={`${selectedListing.address}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Image navigation */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 rounded-full px-3 py-1 text-white text-sm">
                    {activeImageIndex + 1} /{" "}
                    {selectedListing.interiorImages.length + 1}
                  </div>
                </div>

                <button
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
                  onClick={() => setSelectedListing(null)}
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(selectedListing.id);
                    }}
                    className="bg-white rounded-lg shadow px-3 py-2 text-sm font-medium flex items-center"
                  >
                    <Heart
                      className={`w-4 h-4 mr-1 ${
                        selectedListing.favorite
                          ? "fill-red-500 text-red-500"
                          : "text-gray-700"
                      }`}
                    />
                    Save
                  </button>
                  <button className="bg-white rounded-lg shadow px-3 py-2 text-sm font-medium flex items-center">
                    <Share2 className="w-4 h-4 mr-1 text-gray-700" />
                    Share
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {formatPrice(selectedListing.price)}
                    </h2>
                    <p className="text-gray-700 mt-1">
                      {selectedListing.address}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedListing.neighborhood}, {selectedListing.city}
                    </div>
                  </div>
                  <div className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center">
                    <Star className="w-5 h-5 mr-2 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">
                      {selectedListing.matchScore}%
                    </span>
                    <span className="ml-1">Match</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 sm:gap-6 mt-6">
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 text-gray-600 mr-2" />
                    <div>
                      <p className="font-bold text-gray-900">
                        {selectedListing.beds}
                      </p>
                      <p className="text-xs text-gray-500">Beds</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 text-gray-600 mr-2" />
                    <div>
                      <p className="font-bold text-gray-900">
                        {selectedListing.baths}
                      </p>
                      <p className="text-xs text-gray-500">Baths</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-5 h-5 text-gray-600 mr-2" />
                    <div>
                      <p className="font-bold text-gray-900">
                        {selectedListing.sqft.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Sq Ft</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Home className="w-5 h-5 text-gray-600 mr-2" />
                    <div>
                      <p className="font-bold text-gray-900">
                        {selectedListing.propertyType}
                      </p>
                      <p className="text-xs text-gray-500">Type</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-600 mr-2" />
                    <div>
                      <p className="font-bold text-gray-900">
                        {selectedListing.yearBuilt}
                      </p>
                      <p className="text-xs text-gray-500">Year Built</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold text-gray-900 mb-2">
                    About this home
                  </h3>
                  <p className="text-gray-700">{selectedListing.description}</p>
                </div>

                {/* Property features */}
                <div className="mt-6">
                  <h3 className="font-bold text-gray-900 mb-3">Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedListing.features.map(
                      (feature: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center text-gray-700 text-sm"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Neighborhood amenities */}
                <div className="mt-6">
                  <h3 className="font-bold text-gray-900 mb-3">
                    Nearby Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                    {selectedListing.neighborhood_amenities.map(
                      (amenity: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-700">{amenity.name}</span>
                          <span className="text-gray-500">
                            {amenity.distance}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Why it's a {selectedListing.matchScore}% match
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Matches your preferred {selectedListing.beds} bed,{" "}
                        {selectedListing.baths} bath criteria
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Located in {selectedListing.neighborhood}, one of your
                        targeted neighborhoods
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Within your budget range at{" "}
                        {formatPrice(selectedListing.price)}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Matches your preferred{" "}
                        {selectedListing.propertyType.toLowerCase()} property
                        type
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Property scores */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                      Walk Score
                    </h4>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${selectedListing.walkScore}%` }}
                        ></div>
                      </div>
                      <span className="ml-3 font-bold text-gray-900">
                        {selectedListing.walkScore}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedListing.walkScore >= 90
                        ? "Walker's Paradise"
                        : selectedListing.walkScore >= 70
                          ? "Very Walkable"
                          : selectedListing.walkScore >= 50
                            ? "Somewhat Walkable"
                            : "Car-Dependent"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                        />
                      </svg>
                      Transit Score
                    </h4>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: `${selectedListing.transitScore}%` }}
                        ></div>
                      </div>
                      <span className="ml-3 font-bold text-gray-900">
                        {selectedListing.transitScore}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedListing.transitScore >= 90
                        ? "Rider's Paradise"
                        : selectedListing.transitScore >= 70
                          ? "Excellent Transit"
                          : selectedListing.transitScore >= 50
                            ? "Good Transit"
                            : "Minimal Transit"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-between">
                <button
                  onClick={() => setSelectedListing(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back to results
                </button>
                <div className="flex gap-2">
                  {selectedListing.virtualTour && (
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      View 3D Tour
                    </button>
                  )}
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Schedule a viewing
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function CheckCircle(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default Discover;
