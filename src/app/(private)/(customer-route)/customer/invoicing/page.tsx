
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import Summary  from './summary';
import Association from './association';

export default function Invoicing() {
  return (
    <div>
        <Tabs defaultValue="summary" className="w-full">
                <TabsList className='w-full'>
                    <TabsTrigger value="summary" className='text-base font-semibold text-gray-600 cursor-pointer'>Resumo</TabsTrigger>
                    <TabsTrigger value="association" className='text-base font-semibold text-gray-600 cursor-pointer'>Associação</TabsTrigger>
                </TabsList>
                <TabsContent value="summary">
                    <Summary  />
                </TabsContent>
                <TabsContent value="association">
                    <Association />
                </TabsContent>
            </Tabs>
    </div>
  )
}
