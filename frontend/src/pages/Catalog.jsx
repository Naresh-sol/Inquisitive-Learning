import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { FiSearch, FiShoppingCart, FiLogOut } from 'react-icons/fi'

import Footer from "../components/common/Footer"
import Course_Card from '../components/core/Catalog/Course_Card'
import FilterSidebar from "../components/core/Catalog/FilterSidebar"
import Loading from './../components/common/Loading';

import { getCatalogPageData } from '../services/operations/pageAndComponentData'
import { fetchCourseCategories, getAllCourses } from './../services/operations/courseDetailsAPI';

function Catalog() {
    const { catalogName } = useParams()
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false);
    
    // New Filter State
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
      difficulty: 'All Levels',
      minPrice: '',
      maxPrice: '',
      minRating: 0,
      sortBy: 'newest'
    });

    const handleResetFilters = () => {
      setFilters({
        difficulty: 'All Levels',
        minPrice: '',
        maxPrice: '',
        minRating: 0,
        sortBy: 'newest'
      });
      setSearchQuery("");
    }

    // Fetch All Categories or All Courses depending on route
    useEffect(() => {
        ; (async () => {
            let fetchedCategories = categories;
            if (fetchedCategories.length === 0) {
                try {
                    fetchedCategories = await fetchCourseCategories();
                    setCategories(fetchedCategories);
                } catch (error) {
                    console.log("Could not fetch Categories.", error)
                }
            }

            if (catalogName) {
                try {
                    const category_id = fetchedCategories.filter(
                        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
                    )[0]?._id;
                    if(category_id) setCategoryId(category_id)
                } catch (error) {
                    console.log("Could not fetch Categories.", error)
                }
            } else {
                // If no specific category, fetch all courses
                setLoading(true)
                try {
                    const res = await getAllCourses();
                    setCatalogPageData({
                        selectedCategory: {
                            name: 'All Courses',
                            description: 'Explore all premium courses across all fields.',
                            courses: res
                        }
                    });
                } catch (error) {
                    console.log("Could not fetch all courses.", error)
                }
                setLoading(false)
            }
        })()
    }, [catalogName])


    useEffect(() => {
        if (categoryId) {
            ; (async () => {
                setLoading(true)
                try {
                    const res = await getCatalogPageData(categoryId)
                    setCatalogPageData(res)
                } catch (error) {
                    console.log(error)
                }
                setLoading(false)
            })()
        }
    }, [categoryId])

    if (loading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Loading />
            </div>
        )
    }

    // Combine courses for display logic, fallback if API fails
    const allCourses = catalogPageData?.selectedCategory?.courses || [];
    
    // Client-side filtering logic
    let filteredCourses = allCourses.filter(c => {
      // Search
      if (searchQuery && (!c.courseName || !c.courseName.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
      
      // Price Filter
      if (filters.minPrice && c.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && c.price > Number(filters.maxPrice)) return false;

      // Rating Filter
      if (filters.minRating > 0) {
        // Calculate average rating for the course
        const ratings = c.ratingAndReviews || [];
        const avgRating = ratings.length > 0 
          ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length 
          : 0;
        
        if (avgRating < filters.minRating) return false;
      }

      // Difficulty Filter
      if (filters.difficulty && filters.difficulty !== 'All Levels') {
        const courseDiff = c.difficulty || 'All Levels';
        if (courseDiff !== filters.difficulty) return false;
      }

      return true;
    });

    // Sorting logic
    filteredCourses.sort((a, b) => {
      if (filters.sortBy === 'price_low') {
        return a.price - b.price;
      } else if (filters.sortBy === 'price_high') {
        return b.price - a.price;
      } else if (filters.sortBy === 'popular') {
        const studentsA = a.studentsEnrolled?.length || 0;
        const studentsB = b.studentsEnrolled?.length || 0;
        return studentsB - studentsA;
      } else {
        // newest (default) - assuming createdAt exists, else fallback to _id which has timestamp
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });

    return (
        <div className="min-h-screen text-richblack-900 font-inter">
            
            {/* Header / Hero Section */}
            <div className="border-b border-gray-300">
                <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
                    
                    {/* Top Row: Title & Search */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-richblack-900 mb-2">Explore Catalog</h1>
                            <p className="text-gray-600 text-sm">Discover premium courses engineered for professional developers.</p>
                        </div>
                        <div className="relative w-full lg:w-[400px]">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                              type="text" 
                              placeholder="Search keywords..." 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full bg-white border border-gray-300 shadow-sm rounded-full py-3 pl-12 pr-24 text-sm text-richblack-900 focus:outline-none focus:border-[#00C16A]"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00C16A] hover:bg-[#00A359] text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors">
                                Search
                            </button>
                        </div>
                    </div>



                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Left Sidebar Filters */}
                    <FilterSidebar 
                      filters={filters}
                      setFilters={setFilters}
                      handleReset={handleResetFilters}
                      categories={categories}
                    />

                    {/* Right Side Course Grid */}
                    <div className="flex-1 w-full">
                        {!catalogPageData ? (
                            <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
                                Select a valid category to view courses.
                            </div>
                        ) : filteredCourses.length === 0 ? (
                            <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
                                No courses found matching your criteria.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredCourses.map((course, i) => (
                                    <Course_Card course={course} key={i} />
                                ))}
                                {catalogPageData?.differentCategory?.courses?.map((course, i) => (
                                    <Course_Card course={course} key={`diff-${i}`} />
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Catalog
