
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, Search } from 'lucide-react';
import { forwardGeocode, GeocodingResult } from '@/utils/osmUtils';
import { toast } from 'sonner';

interface MapSearchBoxProps {
  onSearchResults: (results: GeocodingResult[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const MapSearchBox = ({ onSearchResults, isLoading, setIsLoading }: MapSearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setIsLoading(true);
      const results = await forwardGeocode(searchQuery);
      onSearchResults(results);
      
      if (results.length > 0) {
        toast.success(`Found ${results.length} locations`);
      } else {
        toast.error("No results found");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Search location..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="flex-grow"
      />
      <Button
        onClick={handleSearch}
        disabled={isLoading}
        variant="secondary"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default MapSearchBox;
