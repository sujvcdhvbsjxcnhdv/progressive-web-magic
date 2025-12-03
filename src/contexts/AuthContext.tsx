import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string | null;
  avatar_url: string | null;
  username: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isDemo: boolean;
  signOut: () => Promise<void>;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for testing
const demoUser: User = {
  id: 'demo-user-id',
  email: 'demo@crushvibe.ai',
  app_metadata: {},
  user_metadata: { avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
} as User;

const demoProfile: Profile = {
  id: 'demo-user-id',
  email: 'demo@crushvibe.ai',
  avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  username: 'DemoUser',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isDemo) {
          setSession(session);
          setUser(session?.user ?? null);
          
          // Fetch profile when user logs in
          if (session?.user) {
            setTimeout(() => {
              fetchProfile(session.user.id);
            }, 0);
          } else {
            setProfile(null);
          }
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isDemo) {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isDemo]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  };

  const enableDemoMode = () => {
    setIsDemo(true);
    setUser(demoUser);
    setProfile(demoProfile);
    setSession({ user: demoUser } as Session);
  };

  const disableDemoMode = () => {
    setIsDemo(false);
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const signOut = async () => {
    if (isDemo) {
      disableDemoMode();
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, isDemo, signOut, enableDemoMode, disableDemoMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
