import axios from "axios";
import { fetchPendingGroupSubmissions, type GroupSubmission } from "./api-mark-submition";

// Use the same API configuration as other files
const API_BASE_URL = "/api/proxy";

// Create axios instance with proper configuration
const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000, // 1 second timeout for large Excel files
  withCredentials: false,
  responseType: 'json', // Default to JSON, will override for Excel downloads
});

// Add request interceptor to include auth token
apiInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("API Summary: Sending token with request");
    } else {
      console.log("API Summary: No token found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interface for the API response when generating summary sheets
interface SummarySheetResponse {
  success: boolean;
  message: string;
  data?: {
    downloadUrl?: string;
    fileName?: string;
    fileSize?: number;
  };
  timestamp: string;
}

/**
 * Generates a year summary sheet in Excel format
 * @param params - Contains academicYearId and groupId from the class being viewed
 * @returns Promise with response data including download information
 */
export const generateYearSummarySheet = async (
  params: SummarySheetParams
): Promise<SummarySheetResponse> => {
  try {
    console.log('API Summary: Generating year summary sheet with params:', {
      academicYearId: params.academicYearId,
      groupId: params.groupId,
      groupIdType: typeof params.groupId,
      groupIdLength: params.groupId?.length
    });
    
    // Validate required parameters
    if (!params.academicYearId) {
      throw new Error('Academic Year ID is required');
    }
    
    if (!params.groupId) {
      throw new Error('Group ID is required');
    }
    
    const url = `/grading/overall-sheets/generate-year-summary-sheet/${params.academicYearId}/group/${params.groupId}/excel`;
    console.log('API Summary: Full URL:', `${API_BASE_URL}${url}`);
    
    // For Excel file downloads, we might need to handle this differently
    const response = await apiInstance.get(url, {
      responseType: 'blob' // Handle Excel file downloads
    });
    
    console.log('API Summary: Response status:', response.status);
    
    // If the response is a blob (Excel file), handle the download
    if (response.data instanceof Blob) {
      console.log('API Summary: Received Excel file blob');
      
      // Create a download link for the Excel file
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      
      const downloadUrl = window.URL.createObjectURL(blob);
      const fileName = `year-summary-${params.academicYearId}-group-${params.groupId}.xlsx`;
      
      // Trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      window.URL.revokeObjectURL(downloadUrl);
      
      return {
        success: true,
        message: 'Year summary sheet generated and downloaded successfully',
        data: {
          fileName,
          fileSize: blob.size
        },
        timestamp: new Date().toISOString()
      };
    }
    
    // If the response is JSON (error or different response format)
    console.log('API Summary: Response data:', response.data);
    return response.data as SummarySheetResponse;
    
  } catch (error) {
    console.error('API Summary: Error generating year summary sheet:', error);
    
    if (axios.isAxiosError(error)) {
      console.error('API Summary: Axios error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      
      // Return a structured error response
      return {
        success: false,
        message: `Failed to generate year summary sheet: ${error.response?.status} ${error.response?.statusText}`,
        timestamp: new Date().toISOString()
      };
    }
    
    return {
      success: false,
      message: `Failed to generate year summary sheet: ${error instanceof Error ? error.message : 'Unknown error'}`,
      timestamp: new Date().toISOString()
    };
  }
};

// Get available groups for summary sheet generation
export const getAvailableGroups = async (academicYearId: string) => {
  try {
    console.log('API Summary: Fetching available groups for academic year:', academicYearId);
    
    // This is a placeholder - you might need a different endpoint to get groups
    const url = `/grading/groups?academicYearId=${academicYearId}`;
    console.log('API Summary: Full URL:', `${API_BASE_URL}${url}`);
    
    const response = await apiInstance.get(url);
    console.log('API Summary: Groups response:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('API Summary: Error fetching groups:', error);
    throw error;
  }
};

// Get submitted group IDs from lesson submissions
export const getSubmittedGroupIds = async (): Promise<string[]> => {
  try {
    console.log('API Summary: Fetching submitted group IDs from lesson submissions');
    
    const response = await fetchPendingGroupSubmissions();
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch group submissions');
    }
    
    // Extract unique group IDs from the submissions
    const groupIds = response.data.map((submission: GroupSubmission) => submission.groupId);
    const uniqueGroupIds = [...new Set(groupIds)]; // Remove duplicates
    
    console.log('API Summary: Found submitted group IDs:', uniqueGroupIds);
    
    return uniqueGroupIds;
  } catch (error) {
    console.error('API Summary: Error fetching submitted group IDs:', error);
    throw error;
  }
};

// Get submitted groups with their details
export const getSubmittedGroups = async (): Promise<GroupSubmission[]> => {
  try {
    console.log('API Summary: Fetching submitted groups with details');
    
    const response = await fetchPendingGroupSubmissions();
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch group submissions');
    }
    
    console.log('API Summary: Found submitted groups:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('API Summary: Error fetching submitted groups:', error);
    throw error;
  }
};

// Interface for using in components
export interface SummarySheetParams {
  academicYearId: string;  // Academic year ID from context
  groupId: string;         // Group ID from the class being viewed
  filename?: string;       // Optional: For storing the filename when generated
  lastModified?: Date;     // Optional: Last modification time
  size?: number;           // Optional: File size
}

// Generate summary sheet blob for preview (without downloading)
export const generateSummarySheetForPreview = async (
  params: SummarySheetParams
): Promise<{ blob: Blob; filename: string }> => {
  const { academicYearId, groupId } = params;
  try {
    console.log('API Summary: Generating summary sheet for preview', {
      academicYearId,
      groupId
    });
    
    const url = `/grading/overall-sheets/generate-year-summary-sheet/${academicYearId}/group/${groupId}/excel`;
    console.log('API Summary: Full URL:', `${API_BASE_URL}${url}`);
    
    const response = await apiInstance.get(url, {
      responseType: 'blob'
    });
    
    console.log('API Summary: Response status:', response.status);
    
    if (response.data instanceof Blob) {
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      
      const filename = `year-summary-${academicYearId}-group-${groupId}.xlsx`;
      
      return { blob, filename };
    }
    
    throw new Error('Response is not a valid Excel blob');
  } catch (error) {
    console.error('API Summary: Error generating summary sheet for preview:', error);
    throw error;
  }
};

// Export types for use in components
export type { SummarySheetResponse };