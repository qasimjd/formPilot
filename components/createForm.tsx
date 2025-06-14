'use client';

import { useState } from 'react';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Sparkle } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { generateFormJSON } from '@/lib/gemini';
import { saveFormToDatabase } from '@/db/actions/form.action';
import { useRouter } from 'next/navigation';
import { useFormStore } from '@/store/formStore';
import { toast } from 'sonner';
import { dicrementCredits, getUserFreeCredits } from '@/db/actions/user.actions';

const CreateForm = () => {
  const [userPrompt, setUserPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { isProUser } = useFormStore();

  const checkCredits = async () => {
    const freeCredits = await getUserFreeCredits();
    return freeCredits
  }

  const handleGenerate = async () => {
    if (!userPrompt.trim()) return;
    setLoading(true);

    let freeAndNoCredits = false;
    if (!isProUser) {
      const credits = await checkCredits();
      freeAndNoCredits = (credits ?? 0) < 1;
    }

    if (freeAndNoCredits) {
      toast.warning("You've used all your free form credits. Please upgrade your plan to continue creating forms.", {
        action: {
          label: 'Upgrade Now',
          onClick: () => router.push('/dashboard/upgrade'),
        },
        duration: 6000,
      });
      setLoading(false);
      return;
    }
    try {
      const json = await generateFormJSON(userPrompt);
      if (!json) { throw new Error('No JSON generated'); }
      // Ensure JSON is stringified for DB (saveFormToDatabase expects a string)
      const formId = await saveFormToDatabase(JSON.stringify(json));
      if (formId) {
        await dicrementCredits();
        router.push(`/edit-form/${formId}`);
      } else {
        toast.error('Failed to save form');
      }
    } catch (error) {
      console.error('Failed to generate form:', error);
      toast.error('Something went wrong while generating your form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2 cursor-pointer">
          <Sparkle className="h-4 w-4" />
          <span className='hidden sm:block'>Generate Form</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-primary shadow-xl rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold mb-2">
            Let AI build your form
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Describe what kind of form you want — our AI will create it in seconds.
              </p>
              <Textarea
                className="min-h-[120px] resize-y mb-4"
                placeholder="Example: Create a contact form with name, email, phone..."
                onChange={(e) => setUserPrompt(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mb-6">
                💡 Tip: The more detailed your prompt, the better the result.
              </p>
              <div className="flex justify-end">
                <Button
                  onClick={handleGenerate}
                  size="sm"
                  variant="default"
                  className="gap-2 cursor-pointer"
                  disabled={loading}
                >
                  <Sparkle className="h-4 w-4" />
                  {loading ? 'Generating...' : 'Generate'}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
