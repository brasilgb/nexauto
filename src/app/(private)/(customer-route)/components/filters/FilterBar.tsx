import { FilterDate } from './FilterDate'
import FilterCompany from './FilterCompany'

export default function FilterBAr() {

  return (
    <div className='flex items-center justify-start gap-6 px-4 py-4'>
      <FilterDate />
      <FilterCompany />
    </div>
  );
}

