import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useUserProfile = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      createUserProfileIfNotExists();
    }
  }, [user]);

  const createUserProfileIfNotExists = async () => {
    if (!user) return;

    try {
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!existingProfile) {
        // Create profile for new user
        await supabase
          .from('user_profiles')
          .insert({
            user_id: user.id,
            display_name: user.email?.split('@')[0] || 'Student',
            email: user.email || ''
          });

        // Create initial progress record
        await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            total_points: 0,
            level: 1,
            achievements: [],
            quiz_scores: [],
            simulation_scores: [],
            certificates: []
          });
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };
};