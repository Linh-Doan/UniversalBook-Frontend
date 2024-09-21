import { useState } from "react";
import { Link } from "react-router-dom";
import { Dashboard } from "./Components/Dashboard";
import { MembershipDetails} from "./Components/MembershipDetails";
import { PersonalDetails} from "./Components/PersonalDetails";

const dashboard = 'dashboard';
const personaDetails = 'personaldetails';
const createBook = 'createbook';
const membership = 'membership';

export const PersonalProfile = (id) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <main>
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
        <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
      <section className="flex flex-row h-full w-full">
        <aside id="default-sidebar" className="left-0 z-40 w-1/5 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar" >
          <div className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <Link onClick={() => setActiveTab(dashboard)} className={`flex items-center p-2 text-gray-900 hover:rounded-lg ${activeTab ===  dashboard? '' : 'hover:' }bg-gray-100 group`}>
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd"/>
                  </svg>

                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => setActiveTab(personaDetails)} className={`flex items-center p-2 text-gray-900 hover:rounded-lg ${activeTab === personaDetails? '' : 'hover:' }bg-gray-100 group`}>
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clipRule="evenodd"/>
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">Personal details</span>
                </Link>
              </li>
              <li>
                <Link to="/bookcreator" onClick={() => setActiveTab(createBook)}  className={`flex items-center p-2 text-gray-900 hover:rounded-lg ${activeTab === createBook? '' : 'hover:'}bg-gray-100 group`}>
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Create book</span>
                </Link>
              </li>
              <li>
                <Link onClick={() => setActiveTab(membership)}  className={`flex items-center p-2 text-gray-900 hover:rounded-lg ${activeTab === membership? '' : 'hover:'}bg-gray-100 group`}>
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"/>
                </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Manage membership</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div className="p-4 w-full">
          {activeTab === 'dashboard' && <Dashboard/>}
          {activeTab === 'personaldetails' && <PersonalDetails/>}
          {activeTab === 'membership' && <MembershipDetails/>}
        </div>
      </section>
    </main>
    

  );
}

