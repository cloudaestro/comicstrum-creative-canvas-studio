
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Advertisement {
  id: string;
  title: string;
  description: string;
  image_url: string;
  redirect_url: string;
}

const Advertisement: React.FC = () => {
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomAd = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('advertisements')
          .select('*')
          .eq('is_active', true);

        if (error) throw error;

        if (data && data.length > 0) {
          // Select a random ad from the available ones
          const randomIndex = Math.floor(Math.random() * data.length);
          setAd(data[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching advertisement:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomAd();
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-4 space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-1/3 mt-2" />
        </CardContent>
      </Card>
    );
  }

  if (!ad) {
    return null;
  }

  return (
    <Card className="w-full overflow-hidden">
      <div className="relative h-32 overflow-hidden">
        <img
          src={ad.image_url}
          alt={ad.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
          Ad
        </div>
      </div>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{ad.title}</CardTitle>
        <CardDescription className="mt-2">
          {ad.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          asChild 
          className="w-full bg-comic-purple hover:bg-opacity-90"
        >
          <Link to={ad.redirect_url}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Advertisement;
