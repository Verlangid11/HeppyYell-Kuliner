
import React, { useState } from 'react';
import { searchWithGoogle, searchWithMaps } from '../services/geminiService';

type SearchMode = 'search' | 'maps';

const GeminiSection = () => {
    const [mode, setMode] = useState<SearchMode>('search');
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ text: string; sources: any[] } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            if (mode === 'search') {
                const response = await searchWithGoogle(query);
                setResult(response);
            } else {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const response = await searchWithMaps(query, { latitude, longitude });
                        setResult(response);
                    },
                    (geoError) => {
                        setError(`Geolocation error: ${geoError.message}. Please enable location services.`);
                        setIsLoading(false);
                    }
                );
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            if (mode === 'search') setIsLoading(false); // For maps, loading is handled in callback
        }
    };
    
    // This effect is needed because geolocation is async
    React.useEffect(() => {
        if(result) setIsLoading(false);
    }, [result]);

    const renderSource = (source: any, index: number) => {
        if (source.web) {
            return <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{source.web.title}</a>;
        }
        if (source.maps) {
             return <a href={source.maps.uri} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">{source.maps.title || 'View on Google Maps'}</a>;
        }
        return null;
    };
    
    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">Explore with AI</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Ask about Padang cuisine or find local recommendations, powered by Gemini.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto bg-brand-light dark:bg-brand-card p-6 rounded-2xl shadow-lg">
                    <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg mb-4">
                        <button onClick={() => setMode('search')} className={`flex-1 p-2 rounded-l-lg ${mode === 'search' ? 'bg-brand-primary text-white' : 'bg-transparent'}`}>
                            Learn about Food
                        </button>
                        <button onClick={() => setMode('maps')} className={`flex-1 p-2 rounded-r-lg ${mode === 'maps' ? 'bg-brand-primary text-white' : 'bg-transparent'}`}>
                            Find Nearby
                        </button>
                    </div>

                    <form onSubmit={handleSearch}>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={mode === 'search' ? "e.g., What is bumbu rendang?" : "e.g., Padang restaurants near me"}
                                className="flex-grow p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-brand-secondary outline-none"
                            />
                            <button type="submit" disabled={isLoading} className="bg-brand-secondary text-brand-dark font-bold px-6 rounded-lg hover:bg-yellow-500 disabled:opacity-50">
                                {isLoading ? '...' : 'Ask'}
                            </button>
                        </div>
                    </form>
                    
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                    
                    {result && (
                        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
                            <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{result.text}</p>
                            {result.sources.length > 0 && (
                                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                                    <h4 className="font-semibold text-sm mb-2 text-gray-600 dark:text-gray-400">Sources:</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {result.sources.map((source, index) => (
                                            <li key={index}>{renderSource(source, index)}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GeminiSection;
