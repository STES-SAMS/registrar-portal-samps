"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  downloadRetakersExcelSheet, 
  fetchAndParseRetakersSheet,
  validateRetakersSheetParams,
  type RetakersExcelPreviewData,
  type RetakersSheetParams,
} from '@/lib/api-retakers';
import { useCurrentAcademicSelection } from "@/appContext/academicContext";
import { useAuth } from '@/appContext/authcontext';

interface RepeatersComponentProps {
  className?: string;
  year?: string;
  groupId?: string;
}

const RepeatersComponent: React.FC<RepeatersComponentProps> = ({ className, year, groupId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  
  // Get authentication token
  const { token } = useAuth();
  
  // Get the current academic year ID and semester data from the academic context
  const { academicYearId, academicYearData } = useCurrentAcademicSelection();
  
  // Initialize with defaults, but require explicit values for actual usage
  const [sheetInfo, setSheetInfo] = useState<RetakersSheetParams>({
    yearId: academicYearId || '', // Use the current academic year ID from context
    groupId: groupId || '' 
  });
  
  // Update sheetInfo when academicYearId or groupId changes
  useEffect(() => {
    console.log(`RepeatersComponent: Using academicYearId: ${academicYearId}, groupId: ${groupId || 'none'}`);
    
    setSheetInfo(prev => ({
      yearId: academicYearId || prev.yearId,
      groupId: groupId || prev.groupId
    }));
  }, [groupId, academicYearId]);
  
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<RetakersExcelPreviewData | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "preview">("info");
  const { toast } = useToast();

  const loadPreview = async () => {
    setIsPreviewLoading(true);
    setError(null);

    try {
      // First check if we have a groupId (most important parameter)
      if (!sheetInfo.groupId) {
        throw new Error('No group ID selected. Please select a class first.');
      }
      
      validateRetakersSheetParams(sheetInfo);
      const data = await fetchAndParseRetakersSheet(sheetInfo);
      setPreviewData(data);
      setActiveTab("preview");
      
      toast({
        title: "Preview Loaded",
        description: `Successfully loaded retakers sheet preview with ${data.sheets.length} sheet(s).`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Preview Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsPreviewLoading(false);
    }
  };

  // Auto-load preview on mount (client-side only). Use a ref guard to avoid double-calls in Strict Mode
  const hasAutoLoaded = useRef(false);
  useEffect(() => {
    if (hasAutoLoaded.current) return;
    hasAutoLoaded.current = true;
    void loadPreview();
  }, []);

  const downloadSheet = async () => {
    setIsDownloading(true);
    setError(null);

    try {
      validateRetakersSheetParams(sheetInfo);
      const filename = await downloadRetakersExcelSheet(sheetInfo);
      
      toast({
        title: "Download Started",
        description: `Retakers sheet "${filename}" is being downloaded.`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Download Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };



  return (
    <div className="space-y-6">

      {/* Excel Sheet Management */}
      
          {previewData ? (
            <div className="space-y-4">
              {previewData.sheets.map((sheet, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{sheet.sheetName}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          {sheet.headers.map((header, headerIndex) => (
                            <th key={headerIndex} className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-900">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sheet.rows.slice(0, 10).map((row, rowIndex) => (
                          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                                {typeof cell === 'object' && cell !== null ? String(cell) : String(cell || '')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {sheet.totalRows > 10 && (
                      <p className="text-sm text-gray-500 mt-2">
                        Showing first 10 rows of {sheet.totalRows} total rows
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Preview Available</h3>
              <p className="text-gray-600 mb-4">Load the Excel preview to view the retakers sheet data.</p>
              <Button onClick={loadPreview} disabled={isPreviewLoading} className="bg-[#026892] hover:bg-[#025f7f]">
                {isPreviewLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Load Preview
                  </>
                )}
              </Button>
            </Card>
          )}
    </div>
  );
};

export default RepeatersComponent;
