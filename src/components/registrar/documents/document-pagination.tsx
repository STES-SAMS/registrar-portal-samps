import React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PaginationState } from "./types"

interface DocumentPaginationProps {
  pagination: PaginationState
  setPagination: (pagination: PaginationState) => void
  totalItems: number
}

export function DocumentPagination({ 
  pagination, 
  setPagination, 
  totalItems 
}: DocumentPaginationProps) {
  const { currentPage, itemsPerPage } = pagination
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalItems === 0 || totalPages <= 1) {
    return null
  }

  const setCurrentPage = (page: number) => {
    setPagination({ ...pagination, currentPage: page })
  }

  return (
    <div className="flex items-center justify-center pt-4 border-t border-gray-200 mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-[#026892] hover:text-white"}
            />
          </PaginationItem>
          
          {/* First page */}
          {currentPage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink 
                  onClick={() => setCurrentPage(1)}
                  className="cursor-pointer hover:bg-[#026892] hover:text-white"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {currentPage > 4 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {/* Page numbers around current page */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
            if (pageNumber <= totalPages) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNumber)}
                    isActive={currentPage === pageNumber}
                    className={`cursor-pointer ${
                      currentPage === pageNumber 
                        ? "bg-[#026892] text-white" 
                        : "hover:bg-[#026892] hover:text-white"
                    }`}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            }
            return null
          })}

          {/* Last page */}
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink 
                  onClick={() => setCurrentPage(totalPages)}
                  className="cursor-pointer hover:bg-[#026892] hover:text-white"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-[#026892] hover:text-white"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
