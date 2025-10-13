import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import Master from "../../layouts/master/Master";
import GlobalSearch from "../../components/GlobalSearch/GlobalSearch";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import LaunchCard from "./LaunchCard";
import { getLaunchesDataService } from "../../services/launches.service";

interface Launch {
    flight_number: number;
    mission_name: string;
    launch_date_utc: string;
    links: { mission_patch_small: string | null };
    rocket: { rocket_name: string };
    launch_success: boolean | null;
}

const ListPage: React.FC = () => {

    const [launches, setLaunches] = useState<Launch[]>([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [rocketFilter, setRocketFilter] = useState("");
    const [successFilter, setSuccessFilter] = useState("");
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const limit = 10;

    const handleDebouncedSearch = useCallback(
        debounce((value: string) => setDebouncedSearch(value), 500),
        []
    );

    useEffect(() => {
        handleDebouncedSearch(search);
    }, [search, handleDebouncedSearch]);

    const fetchLaunches = async (reset = false) => {
        setLoading(true);
        try {
            const offset = page * limit;
            const response = await getLaunchesDataService({ limit, offset });
            setLaunches((prev) =>
                reset ? response?.data : [...prev, ...response?.data]
            );
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLaunches(page === 0);
    }, [page]);

    // useEffect(() => {
    //     setPage(0);
    //     fetchLaunches(true);
    // }, [debouncedSearch, rocketFilter, successFilter]);

    const filteredLaunches = launches.filter((l) => {
        const missionMatch = l.mission_name.toLowerCase().includes(debouncedSearch.toLowerCase());

        const rocketMatch = rocketFilter
            ? l.rocket.rocket_name.toLowerCase() === rocketFilter.toLowerCase()
            : true;

        const successMatch = successFilter
            ? successFilter === "success"
                ? l.launch_success === true
                : l.launch_success === false
            : true;

        return missionMatch && rocketMatch && successMatch;
    });

    const rockets = Array.from(new Set(launches.map((l) => l.rocket.rocket_name))).sort((a, b) =>
        a.localeCompare(b)
    );

    const handleScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
            setPage((prev) => prev + 1);
        }
    }, [loading]);

    useEffect(() => {
        const debouncedScroll = debounce(handleScroll, 200);
        window.addEventListener("scroll", debouncedScroll);
        return () => {
            window.removeEventListener("scroll", debouncedScroll);
            debouncedScroll.cancel();
        };
    }, [handleScroll]);



    return (
        <Master>
            <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-end md:gap-6">
                <div className="flex-1 min-w-[250px]">
                    <GlobalSearch value={search} onChange={setSearch} />
                </div>
                <div className="min-w-[150px]">
                    <FilterDropdown label="Rocket" options={rockets} value={rocketFilter} onChange={setRocketFilter} />
                </div>
                <div className="min-w-[150px]">
                    <FilterDropdown label="Success" options={["success", "failure"]} value={successFilter} onChange={setSuccessFilter} />
                </div>
            </div>


            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredLaunches.map((launch) => (
                        <LaunchCard
                            key={launch.flight_number}
                            flightNumber={launch.flight_number}
                            name={launch.mission_name}
                            date={launch.launch_date_utc}
                            image={launch.links.mission_patch_small || "/placeholder.png"}
                            rocketName={launch.rocket.rocket_name}
                            success={launch.launch_success}
                        />
                    ))}
                </div>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center my-6 gap-2">
                    <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">Loading more launches...</p>
                </div>
            )}
        </Master>
    );
};

export default ListPage;
