"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Trash2,
  Info,
  CheckCircle,
  X,
  FolderUp,
  ArrowUpFromLine,
  Sparkles,
  Heart,
  MapPin,
  Tag,
  Plus,
  Home,
  Building,
  DollarSign,
  BedDouble,
  Bath,
  Maximize,
  Save,
  Search,
  Edit,
  Settings,
  Filter,
  ChevronsRight,
  Clipboard,
  Star,
  RefreshCw,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Layers,
  Coffee,
  Utensils,
  Dumbbell,
  Music,
  BookOpen,
  Train,
} from "lucide-react";

// Add this interface near the top of your file, with the other interfaces
interface Place {
  name: string;
  category: string;
  description: string;
  lat: number;
  lng: number;
  city: string;
}

import personas, {
  CITIES,
  PROPERTY_TYPES,
  HOME_FEATURES,
  PRICE_RANGES,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  SQUARE_FEET_RANGES,
  PLACE_CATEGORIES,
  PLACES_OF_INTEREST,
  SAMPLE_INSIGHTS,
  HOA_FEE_OPTIONS,
} from "./personas.js";

interface KnowledgeProps {
  uploadedFiles: any[];
  setUploadedFiles: (files: any[]) => void;
  userProfile?: any;
  setUserProfile?: (profile: any) => void;
}

interface FavoritePlace {
  id: string;
  name: string;
  city: string;
  category: string;
  lat: number;
  lng: number;
}

export default function Knowledge({
  uploadedFiles,
  setUploadedFiles,
  userProfile = {},
  setUserProfile = () => {},
}: KnowledgeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("summary");
  const [homePreferences, setHomePreferences] = useState({
    propertyType: userProfile.propertyType || "",
    priceRange: userProfile.priceRange || PRICE_RANGES[2],
    beds: userProfile.beds || BEDROOM_OPTIONS[2],
    baths: userProfile.baths || BATHROOM_OPTIONS[1],
    squareFeet: userProfile.squareFeet || SQUARE_FEET_RANGES[2],
    features: userProfile.homeFeatures || [],
    hoaMax: userProfile.hoaMax || "Any",
  });
  // Explicitly type favoritePlaces as an array of FavoritePlace
  const [favoritePlaces, setFavoritePlaces] = useState<FavoritePlace[]>(
    userProfile.favoritePlaces || [],
  );
  const [newPlace, setNewPlace] = useState({
    name: "",
    city: userProfile.city || CITIES[0].id,
    category: "",
  });
  const [savedHomes, setSavedHomes] = useState(userProfile.savedHomes || []);
  const [customTags, setCustomTags] = useState(userProfile.customTags || []);
  const [newTag, setNewTag] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [aiInsights, setAiInsights] = useState(SAMPLE_INSIGHTS);
  const [activePlaceCategory, setActivePlaceCategory] = useState("all");
  // We'll still keep mapCenter and selectedCity in state for the UI,
  // even though the map is now a placeholder.
  const [mapCenter, setMapCenter] = useState([37.7749, -122.4194]);
  const [selectedCity, setSelectedCity] = useState(
    CITIES.find((c) => c.id === userProfile.city) || CITIES[0],
  );
  const [visiblePlaces, setVisiblePlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (setUserProfile && Object.keys(homePreferences).length > 0) {
      setUserProfile({
        ...userProfile,
        ...homePreferences,
        homeFeatures: homePreferences.features,
        customTags,
        favoritePlaces,
        savedHomes,
        aiInsights,
      });
    }
  }, [
    homePreferences,
    customTags,
    favoritePlaces,
    savedHomes,
    aiInsights,
    setUserProfile,
  ]);

  useEffect(() => {
    // Filter places based on the selected city and category
    const cityName =
      CITIES.find((c) => c.id === userProfile.city)?.name || CITIES[0].name;
    let filteredPlaces = PLACES_OF_INTEREST.filter(
      (place) => place.city === cityName,
    );

    if (activePlaceCategory !== "all") {
      filteredPlaces = filteredPlaces.filter(
        (place) => place.category === activePlaceCategory,
      );
    }

    setVisiblePlaces(filteredPlaces);

    // Update map center based on selected city
    const cityCoords =
      CITIES.find((c) => c.id === userProfile.city) || CITIES[0];
    setMapCenter([cityCoords.lat, cityCoords.lng]);
  }, [userProfile.city, activePlaceCategory]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      setToastMessage(
        `${newFiles.length} file${newFiles.length > 1 ? "s" : ""} uploaded successfully`,
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      const newFiles = Array.from(e.dataTransfer.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      setToastMessage(
        `${newFiles.length} file${newFiles.length > 1 ? "s" : ""} uploaded successfully`,
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleDeleteFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    setToastMessage("File removed");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase() || "";
    if (extension === "pdf")
      return <FileText className="w-6 h-6 text-red-500" />;
    if (["doc", "docx"].includes(extension))
      return <FileText className="w-6 h-6 text-blue-500" />;
    if (["jpg", "jpeg", "png", "gif"].includes(extension))
      return <FileText className="w-6 h-6 text-green-500" />;
    if (["csv", "xls", "xlsx"].includes(extension))
      return <FileText className="w-6 h-6 text-emerald-500" />;
    return <FileText className="w-6 h-6 text-gray-500" />;
  };

  const getFileCategory = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase() || "";
    if (["pdf", "doc", "docx", "txt"].includes(extension)) return "documents";
    if (["jpg", "jpeg", "png", "gif", "svg"].includes(extension))
      return "images";
    return "other";
  };

  const filteredFiles =
    activeFilter === "all"
      ? uploadedFiles
      : uploadedFiles.filter(
          (file) => getFileCategory(file.name) === activeFilter,
        );

  const handleAddPlace = () => {
    if (newPlace.name && newPlace.category) {
      setFavoritePlaces([
        ...favoritePlaces,
        {
          id: Date.now().toString(),
          name: newPlace.name,
          city:
            CITIES.find((c) => c.id === newPlace.city)?.name || newPlace.city,
          category: newPlace.category,
          lat: CITIES.find((c) => c.id === newPlace.city)?.lat || 37.7749,
          lng: CITIES.find((c) => c.id === newPlace.city)?.lng || -122.4194,
        },
      ]);
      setNewPlace({
        name: "",
        city: userProfile.city || CITIES[0].id,
        category: "",
      });
      setToastMessage("New favorite place added");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // The fix: now 'place' in this filter is properly typed as FavoritePlace
  const handleRemovePlace = (id: string) => {
    setFavoritePlaces(favoritePlaces.filter((place) => place.id !== id));
  };

  const handleAddTag = () => {
    if (newTag && !customTags.includes(newTag)) {
      setCustomTags([...customTags, newTag]);
      setNewTag("");
      setToastMessage("New tag added");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setCustomTags(customTags.filter((t) => t !== tag));
  };

  const handleRemoveSavedHome = (id: string) => {
    setSavedHomes(savedHomes.filter((home) => home.id !== id));
  };

  const handleToggleFeature = (feature: string) => {
    setHomePreferences((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f: string) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSavePreferences = () => {
    setIsEditingProfile(false);
    setToastMessage("Home preferences saved");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRefreshInsights = () => {
    setAiInsights(personas.helpers.generateNewInsights(userProfile));
    setToastMessage("Insights refreshed with new data");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleInsightFeedback = (index: number, feedback: string) => {
    setAiInsights(
      personas.helpers.updateInsightFeedback(aiInsights, index, feedback),
    );
    setToastMessage(`Feedback recorded: ${feedback}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getProfileCompletionPercentage = () => {
    return personas.helpers.getProfileCompletionPercentage(homePreferences);
  };

  // Helper to get icon for a place category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cafes":
        return <Coffee className="w-4 h-4" />;
      case "restaurants":
        return <Utensils className="w-4 h-4" />;
      case "shopping":
        return <Building className="w-4 h-4" />;
      case "parks":
        return <Layers className="w-4 h-4" />;
      case "fitness":
        return <Dumbbell className="w-4 h-4" />;
      case "culture":
        return <Music className="w-4 h-4" />;
      case "schools":
        return <BookOpen className="w-4 h-4" />;
      case "transit":
        return <Train className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50">
      {/* Top navigation tabs */}
      <div className="bg-white border-b border-gray-200 px-2">
        <div className="flex overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === "summary"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Clipboard className="w-4 h-4" />
              <span>Profile Summary</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === "preferences"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Home className="w-4 h-4" />
              <span>Home Preferences</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("places")}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === "places"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>Lifestyle & Places</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === "saved"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4" />
              <span>Saved Homes</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === "documents"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Documents</span>
              {uploadedFiles.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {uploadedFiles.length}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab("tags")}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === "tags"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              <span>Tags & Notes</span>
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "summary" && (
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Profile Summary Content */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                Your Home Buyer Profile
              </h2>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {getProfileCompletionPercentage()}% Complete
              </span>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <Home className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-md font-medium">
                    Home Buyer in{" "}
                    {CITIES.find((c) => c.id === userProfile.city)?.name ||
                      "San Francisco"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {homePreferences.propertyType
                      ? `Looking for ${
                          PROPERTY_TYPES.find(
                            (t) => t.value === homePreferences.propertyType,
                          )?.label
                        }`
                      : "Complete your preferences to get matched"}
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${getProfileCompletionPercentage()}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`w-4 h-4 ${
                      homePreferences.propertyType
                        ? "text-green-500"
                        : "text-gray-300"
                    }`}
                  />
                  <span
                    className={
                      homePreferences.propertyType
                        ? "text-gray-800"
                        : "text-gray-400"
                    }
                  >
                    Property Type
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`w-4 h-4 ${
                      homePreferences.priceRange
                        ? "text-green-500"
                        : "text-gray-300"
                    }`}
                  />
                  <span
                    className={
                      homePreferences.priceRange
                        ? "text-gray-800"
                        : "text-gray-400"
                    }
                  >
                    Price Range
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`w-4 h-4 ${
                      homePreferences.features.length > 0
                        ? "text-green-500"
                        : "text-gray-300"
                    }`}
                  />
                  <span
                    className={
                      homePreferences.features.length > 0
                        ? "text-gray-800"
                        : "text-gray-400"
                    }
                  >
                    Home Features
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`w-4 h-4 ${
                      favoritePlaces.length > 0
                        ? "text-green-500"
                        : "text-gray-300"
                    }`}
                  />
                  <span
                    className={
                      favoritePlaces.length > 0
                        ? "text-gray-800"
                        : "text-gray-400"
                    }
                  >
                    Favorite Places
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`w-4 h-4 ${
                      savedHomes.length > 0 ? "text-green-500" : "text-gray-300"
                    }`}
                  />
                  <span
                    className={
                      savedHomes.length > 0 ? "text-gray-800" : "text-gray-400"
                    }
                  >
                    Saved Homes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={`w-4 h-4 ${
                      uploadedFiles.length > 0
                        ? "text-green-500"
                        : "text-gray-300"
                    }`}
                  />
                  <span
                    className={
                      uploadedFiles.length > 0
                        ? "text-gray-800"
                        : "text-gray-400"
                    }
                  >
                    Documents
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-blue-600" />
                  Home Preferences
                </h3>
                <button
                  onClick={() => setActiveTab("preferences")}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Edit</span>
                  <ChevronsRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Property Type:</span>
                  <span className="font-medium">
                    {homePreferences.propertyType
                      ? PROPERTY_TYPES.find(
                          (t) => t.value === homePreferences.propertyType,
                        )?.label
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Price Range:</span>
                  <span className="font-medium">
                    {homePreferences.priceRange
                      ? `$${homePreferences.priceRange.min.toLocaleString()} - $${homePreferences.priceRange.max.toLocaleString()}`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bedrooms:</span>
                  <span className="font-medium">
                    {homePreferences.beds || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bathrooms:</span>
                  <span className="font-medium">
                    {homePreferences.baths || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Size:</span>
                  <span className="font-medium">
                    {homePreferences.squareFeet || "—"}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Lifestyle & Places
                </h3>
                <button
                  onClick={() => setActiveTab("places")}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Edit</span>
                  <ChevronsRight className="w-3 h-3" />
                </button>
              </div>
              {favoritePlaces.length > 0 ? (
                <div className="space-y-2">
                  {favoritePlaces.slice(0, 3).map((place) => (
                    <div key={place.id} className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <MapPin className="w-3 h-3" />
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">{place.name}</span>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{place.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {favoritePlaces.length > 3 && (
                    <div className="text-xs text-gray-500 mt-1">
                      + {favoritePlaces.length - 3} more places
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-gray-500 flex flex-col items-center py-2">
                  <MapPin className="w-5 h-5 text-gray-300 mb-1" />
                  <span>No favorite places added yet</span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-blue-600" />
                Specific Requirements
              </h3>
              <button
                onClick={() => setActiveTab("tags")}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>Manage</span>
                <ChevronsRight className="w-3 h-3" />
              </button>
            </div>
            {customTags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {customTags.map((tag, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 rounded-full flex items-center gap-2"
                  >
                    <Tag className="w-3 h-3 text-blue-600" />
                    <span className="text-sm">{tag}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-2">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <button
                    onClick={() => setActiveTab("tags")}
                    className="text-sm text-gray-600 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add specific requirements</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
            <button className="flex-1 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              <span>Find Matching Homes</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === "preferences" && (
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Home Preferences
            </h2>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              {isEditingProfile ? "Cancel" : <Edit className="w-4 h-4" />}
              {isEditingProfile ? "Cancel" : "Edit"}
            </button>
          </div>
          <div
            className={`space-y-6 ${!isEditingProfile && "opacity-90 pointer-events-none"}`}
          >
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Home className="w-4 h-4 mr-2 text-blue-600" />
                Property Type
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {PROPERTY_TYPES.map((type) => (
                  <div
                    key={type.value}
                    onClick={() =>
                      isEditingProfile &&
                      setHomePreferences({
                        ...homePreferences,
                        propertyType: type.value,
                      })
                    }
                    className={`cursor-pointer border rounded-lg p-3 flex items-center gap-2 ${
                      homePreferences.propertyType === type.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    {personas.helpers.getPropertyTypeIcon(type.value)}
                    <div>
                      <p className="text-sm font-medium">{type.label}</p>
                      <p className="text-xs text-gray-500">
                        {type.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
                Price Range
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {PRICE_RANGES.map((range, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      isEditingProfile &&
                      setHomePreferences({
                        ...homePreferences,
                        priceRange: range,
                      })
                    }
                    className={`cursor-pointer border rounded-lg p-3 text-center ${
                      homePreferences.priceRange?.min === range.min &&
                      homePreferences.priceRange?.max === range.max
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <p className="text-sm font-medium">
                      ${range.min.toLocaleString()} - $
                      {range.max.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-blue-600" />
                HOA Fees
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {HOA_FEE_OPTIONS.map((option, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      isEditingProfile &&
                      setHomePreferences({
                        ...homePreferences,
                        hoaMax: option.value,
                      })
                    }
                    className={`cursor-pointer border rounded-lg p-3 text-center ${
                      homePreferences.hoaMax === option.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <p className="text-sm font-medium">{option.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <BedDouble className="w-4 h-4 mr-2 text-blue-600" />
                  Bedrooms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {BEDROOM_OPTIONS.map((option) => (
                    <div
                      key={option}
                      onClick={() =>
                        isEditingProfile &&
                        setHomePreferences({ ...homePreferences, beds: option })
                      }
                      className={`cursor-pointer border rounded-lg px-3 py-2 text-center ${
                        homePreferences.beds === option
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{option}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Bath className="w-4 h-4 mr-2 text-blue-600" />
                  Bathrooms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {BATHROOM_OPTIONS.map((option) => (
                    <div
                      key={option}
                      onClick={() =>
                        isEditingProfile &&
                        setHomePreferences({
                          ...homePreferences,
                          baths: option,
                        })
                      }
                      className={`cursor-pointer border rounded-lg px-3 py-2 text-center ${
                        homePreferences.baths === option
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{option}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Maximize className="w-4 h-4 mr-2 text-blue-600" />
                Square Footage
              </h3>
              <div className="flex flex-wrap gap-2">
                {SQUARE_FEET_RANGES.map((option) => (
                  <div
                    key={option}
                    onClick={() =>
                      isEditingProfile &&
                      setHomePreferences({
                        ...homePreferences,
                        squareFeet: option,
                      })
                    }
                    className={`cursor-pointer border rounded-lg px-3 py-2 text-center ${
                      homePreferences.squareFeet === option
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{option}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Home Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {HOME_FEATURES.map((feature) => (
                  <div
                    key={feature.value}
                    onClick={() =>
                      isEditingProfile && handleToggleFeature(feature.value)
                    }
                    className={`cursor-pointer border rounded-lg p-3 ${
                      homePreferences.features.includes(feature.value)
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">{feature.label}</p>
                        <p className="text-xs text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                      {homePreferences.features.includes(feature.value) && (
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {isEditingProfile && (
              <div className="flex justify-end">
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "places" && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Lifestyle & Places
              </h2>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {favoritePlaces.length} Places
                </span>
              </div>
            </div>
          </div>

          {/* Map section placeholder */}
          <div className="relative flex-none" style={{ height: "420px" }}>
            {/* Header overlay */}
            <div className="absolute top-0 z-10 w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-3 px-4 text-white">
              <div className="flex justify-between items-center">
                <h3 className="font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Discover {selectedCity.name}
                </h3>
                <div className="flex items-center gap-2">
                  <select
                    value={userProfile.city || CITIES[0].id}
                    onChange={(e) => {
                      const cityId = e.target.value;
                      setUserProfile({ ...userProfile, city: cityId });
                      const city = CITIES.find((c) => c.id === cityId);
                      setSelectedCity(city);
                      setMapCenter([city.lat, city.lng]);
                    }}
                    className="bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg py-1 px-2 text-sm"
                  >
                    {CITIES.map((city) => (
                      <option
                        key={city.id}
                        value={city.id}
                        className="text-gray-800"
                      >
                        {city.icon} {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-xs text-blue-100 mt-1">
                Explore places that match your lifestyle and find your perfect
                neighborhood
              </p>
            </div>

            {/* Filter overlay */}
            <div className="absolute top-16 z-10 w-full bg-white border-b border-gray-200 p-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center">
                <div className="flex pr-2 border-r border-gray-200">
                  <button
                    onClick={() => setActivePlaceCategory("all")}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors mr-1 ${
                      activePlaceCategory === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                </div>
                <div className="flex gap-1 px-2 overflow-x-auto no-scrollbar">
                  {PLACE_CATEGORIES.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActivePlaceCategory(category)}
                      className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
                        activePlaceCategory === category
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {getCategoryIcon(category)}
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center z-0">
              <p className="text-gray-600">Map Placeholder</p>
            </div>

            {/* Map statistics overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex gap-2 overflow-x-auto no-scrollbar">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Places in area</p>
                  <p className="text-lg font-semibold">
                    {visiblePlaces.length}
                  </p>
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Your favorites</p>
                  <p className="text-lg font-semibold">
                    {
                      favoritePlaces.filter((p) => p.city === selectedCity.name)
                        .length
                    }
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 rounded-lg shadow-lg p-3 flex items-center gap-3 text-white cursor-pointer ml-auto"
                onClick={() => {
                  // Find a random place to highlight
                  if (visiblePlaces.length > 0) {
                    const randomPlace =
                      visiblePlaces[
                        Math.floor(Math.random() * visiblePlaces.length)
                      ];
                    setMapCenter([randomPlace.lat, randomPlace.lng]);
                  }
                }}
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Discover new place</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content below map */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {visiblePlaces.slice(0, 4).map((place, idx) => (
                <motion.div
                  key={`place-card-${place.name}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div
                    className={`h-2 ${
                      place.category === "parks"
                        ? "bg-green-500"
                        : place.category === "cafes"
                          ? "bg-yellow-500"
                          : place.category === "restaurants"
                            ? "bg-red-500"
                            : place.category === "shopping"
                              ? "bg-purple-500"
                              : place.category === "culture"
                                ? "bg-pink-500"
                                : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">
                        {place.name}
                      </h4>
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                        {place.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {place.description}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <button
                        onClick={() => {
                          setMapCenter([place.lat, place.lng]);
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        View on map
                      </button>
                      <button
                        onClick={() => {
                          if (
                            !favoritePlaces.some((p) => p.name === place.name)
                          ) {
                            const newPlace = {
                              id: Date.now().toString(),
                              name: place.name,
                              city: place.city,
                              category: place.category,
                              lat: place.lat,
                              lng: place.lng,
                            };
                            setFavoritePlaces([...favoritePlaces, newPlace]);
                            setToastMessage("Added to favorites!");
                            setShowToast(true);
                            setTimeout(() => setShowToast(false), 3000);
                          }
                        }}
                        className="text-xs px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Add to favorites
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "saved" && (
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Saved Homes</h2>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {savedHomes.length} Homes
            </span>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              How This Helps Your Search
            </h3>
            <p className="text-sm text-gray-600">
              Homes you save help our AI understand your style preferences. The
              more homes you save, the better we can match you to properties
              you'll love.
            </p>
          </div>
          {savedHomes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedHomes.map((home) => (
                <motion.div
                  key={home.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden group"
                >
                  <div className="relative h-40 bg-gray-200">
                    <img
                      src={home.imageUrl}
                      alt={home.address}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleRemoveSavedHome(home.id)}
                        className="p-1.5 bg-white rounded-full text-gray-500 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {home.matched && home.matched.length > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <div className="flex gap-1 flex-wrap">
                          {home.matched.slice(0, 2).map((match, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-blue-600/90 text-white px-2 py-0.5 rounded-full"
                            >
                              {match}
                            </span>
                          ))}
                          {home.matched.length > 2 && (
                            <span className="text-xs bg-blue-600/90 text-white px-2 py-0.5 rounded-full">
                              +{home.matched.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-gray-800 truncate">
                      {home.address}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      {home.neighborhood}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-blue-600 font-semibold">
                        ${home.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center">
                          <BedDouble className="w-3 h-3 mr-1" />
                          {home.beds}
                        </span>
                        <span className="flex items-center">
                          <Bath className="w-3 h-3 mr-1" />
                          {home.baths}
                        </span>
                        <span className="flex items-center">
                          <Maximize className="w-3 h-3 mr-1" />
                          {home.sqft.toLocaleString()} sqft
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Heart className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No saved homes yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Save homes during your search to see them here
              </p>
            </div>
          )}
          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search More Homes
            </button>
          </div>
          {savedHomes.length > 0 && (
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                What We've Learned From Your Saved Homes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <h4 className="text-sm font-medium">Price Range</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your saved homes average $
                    {Math.round(
                      savedHomes.reduce((acc, home) => acc + home.price, 0) /
                        savedHomes.length,
                    ).toLocaleString()}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <h4 className="text-sm font-medium">Neighborhoods</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    You favor Pacific Heights and Mission areas
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <BedDouble className="w-4 h-4 text-blue-600" />
                    <h4 className="text-sm font-medium">Size Preference</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    {Math.round(
                      savedHomes.reduce((acc, home) => acc + home.beds, 0) /
                        savedHomes.length,
                    )}{" "}
                    beds,{" "}
                    {(
                      savedHomes.reduce((acc, home) => acc + home.baths, 0) /
                      savedHomes.length
                    ).toFixed(1)}{" "}
                    baths on average
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="w-4 h-4 text-blue-600" />
                    <h4 className="text-sm font-medium">Style</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    You like Victorian and Modern styles
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "documents" && (
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Documents</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {[
                { id: "all", label: "All Files" },
                { id: "documents", label: "Documents" },
                { id: "images", label: "Images" },
                { id: "other", label: "Other" },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeFilter === category.id
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.label}
                  {category.id === "all" && uploadedFiles.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                      {uploadedFiles.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-800">
                Document Storage
              </h4>
              <span className="text-xs text-gray-500">39% Used</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-blue-600 h-1.5 rounded-full"
                style={{ width: "39%" }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Upload documents to help with your home search. We can analyze
              pre-approval letters, must-have lists, and other files to enhance
              your results.
            </p>
          </div>
          <div
            className={`border-2 border-dashed rounded-lg p-6 mb-4 transition-colors text-center ${
              isDragging
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-blue-300 bg-white"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              {isDragging ? (
                <FolderUp className="w-10 h-10 text-blue-500 mb-2" />
              ) : (
                <ArrowUpFromLine className="w-10 h-10 text-gray-400 mb-2" />
              )}
              <p className="text-sm font-medium text-gray-700 mb-1">
                {isDragging ? "Drop files to upload" : "Drag & drop files here"}
              </p>
              <p className="text-xs text-gray-500 mb-3">or</p>
              <button
                onClick={() =>
                  document.getElementById("file-upload-input")?.click()
                }
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Files
              </button>
              <input
                id="file-upload-input"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              <p className="text-xs text-gray-500 mt-3">
                Supports PDFs, Word documents, images, and more
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Suggested Documents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border border-gray-200 rounded-lg p-3 flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Pre-Approval Letter</h4>
                  <p className="text-xs text-gray-500">
                    Upload to help set your budget
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Must-Have List</h4>
                  <p className="text-xs text-gray-500">
                    Upload your checklist of requirements
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Neighborhood Research</h4>
                  <p className="text-xs text-gray-500">
                    Notes about areas you're interested in
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Inspiration Photos</h4>
                  <p className="text-xs text-gray-500">
                    Images of styles you love
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Your Documents
          </h3>
          {filteredFiles.length > 0 ? (
            <div className="space-y-2">
              {filteredFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getFileIcon(file.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">
                        {new Date().toLocaleDateString()}
                      </p>
                      <span className="text-gray-300">•</span>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteFile(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Info className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No documents uploaded yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Upload documents to enhance your home search
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "tags" && (
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Tags & Notes
            </h2>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-600">
              Add custom tags and notes to help the AI understand specific
              preferences or requirements that don't fit into standard
              categories.
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Add Custom Tag
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="e.g. 'must have garage', 'close to office'"
                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
              />
              <button
                onClick={handleAddTag}
                disabled={!newTag}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Your Custom Tags
            </h3>
            {customTags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {customTags.map((tag, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 rounded-full flex items-center gap-2 group"
                  >
                    <Tag className="w-3 h-3 text-blue-600" />
                    <span className="text-sm">{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">
                  No custom tags added yet
                </p>
              </div>
            )}
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Additional Notes
            </h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg h-32 text-sm"
              placeholder="Add any other details or preferences that would help the AI understand what you're looking for..."
            ></textarea>
          </div>
        </div>
      )}

      <div className="p-4 border-t border-gray-200 bg-white">
        <button
          className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
            activeTab === "documents"
              ? uploadedFiles.length > 0
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          }`}
          disabled={activeTab === "documents" && uploadedFiles.length === 0}
        >
          <Sparkles className="w-4 h-4" />
          <span>
            {activeTab === "summary"
              ? "Update AI with My Profile"
              : activeTab === "preferences"
                ? "Find Matching Homes"
                : activeTab === "places"
                  ? "Find Neighborhoods Near My Places"
                  : activeTab === "saved"
                    ? "Show Me Similar Homes"
                    : activeTab === "documents"
                      ? "Analyze My Documents"
                      : "Generate Profile Insights"}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50"
          >
            <CheckCircle className="w-4 h-4 text-green-400" />
            <p className="text-sm">{toastMessage}</p>
            <button
              className="ml-2 text-gray-400 hover:text-white"
              onClick={() => setShowToast(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
