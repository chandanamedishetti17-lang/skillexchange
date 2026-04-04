import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center">
        <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
