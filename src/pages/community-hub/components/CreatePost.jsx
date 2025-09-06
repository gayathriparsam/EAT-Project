import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const CreatePost = ({ onPostCreate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [postData, setPostData] = useState({
    content: '',
    mood: null,
    triggerWarning: '',
    tags: '',
    isAnonymous: false,
    allowComments: true
  });

  const moodOptions = [
    { id: 'happy', label: 'Happy', icon: 'Smile', color: 'text-success' },
    { id: 'grateful', label: 'Grateful', icon: 'Heart', color: 'text-success' },
    { id: 'anxious', label: 'Anxious', icon: 'Zap', color: 'text-warning' },
    { id: 'sad', label: 'Sad', icon: 'Cloud', color: 'text-secondary' },
    { id: 'hopeful', label: 'Hopeful', icon: 'Sunrise', color: 'text-accent' },
    { id: 'overwhelmed', label: 'Overwhelmed', icon: 'AlertCircle', color: 'text-error' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!postData?.content?.trim()) return;

    const newPost = {
      id: Date.now(),
      username: postData?.isAnonymous ? 'Anonymous User' : 'You',
      content: postData?.content,
      timestamp: new Date(),
      mood: postData?.mood,
      triggerWarning: postData?.triggerWarning || null,
      tags: postData?.tags ? postData?.tags?.split(',')?.map(tag => tag?.trim()) : [],
      reactions: { heart: 0, hug: 0, strength: 0, support: 0 },
      comments: 0,
      isVerified: !postData?.isAnonymous
    };

    onPostCreate(newPost);
    setPostData({
      content: '',
      mood: null,
      triggerWarning: '',
      tags: '',
      isAnonymous: false,
      allowComments: true
    });
    setIsExpanded(false);
  };

  const characterLimit = 500;
  const remainingChars = characterLimit - postData?.content?.length;

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <Icon name="User" size={18} color="white" />
        </div>
        <div className="flex-1">
          <textarea
            placeholder="Share your thoughts with the community..."
            value={postData?.content}
            onChange={(e) => setPostData(prev => ({ ...prev, content: e?.target?.value }))}
            onFocus={() => setIsExpanded(true)}
            className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            rows={isExpanded ? 4 : 2}
            maxLength={characterLimit}
          />
        </div>
      </div>
      {isExpanded && (
        <div className="space-y-4">
          {/* Character Count */}
          <div className="flex justify-end">
            <span className={`text-xs ${remainingChars < 50 ? 'text-warning' : 'text-text-secondary'}`}>
              {remainingChars} characters remaining
            </span>
          </div>

          {/* Mood Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              How are you feeling? (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {moodOptions?.map((mood) => (
                <button
                  key={mood?.id}
                  type="button"
                  onClick={() => setPostData(prev => ({ 
                    ...prev, 
                    mood: prev?.mood?.id === mood?.id ? null : mood 
                  }))}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full border transition-all duration-200 ${
                    postData?.mood?.id === mood?.id
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:bg-muted'
                  }`}
                >
                  <Icon name={mood?.icon} size={16} className={mood?.color} />
                  <span className="text-sm">{mood?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Warning */}
          <Input
            label="Trigger Warning (Optional)"
            type="text"
            placeholder="Brief description of sensitive content"
            value={postData?.triggerWarning}
            onChange={(e) => setPostData(prev => ({ ...prev, triggerWarning: e?.target?.value }))}
            description="Help others prepare for potentially triggering content"
          />

          {/* Tags */}
          <Input
            label="Tags (Optional)"
            type="text"
            placeholder="anxiety, coping, support (comma-separated)"
            value={postData?.tags}
            onChange={(e) => setPostData(prev => ({ ...prev, tags: e?.target?.value }))}
            description="Help others find your post"
          />

          {/* Options */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <Checkbox
                label="Post anonymously"
                checked={postData?.isAnonymous}
                onChange={(e) => setPostData(prev => ({ ...prev, isAnonymous: e?.target?.checked }))}
              />
              <Checkbox
                label="Allow comments"
                checked={postData?.allowComments}
                onChange={(e) => setPostData(prev => ({ ...prev, allowComments: e?.target?.checked }))}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Image"
                iconPosition="left"
                disabled
              >
                Add Image
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Link"
                iconPosition="left"
                disabled
              >
                Add Link
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsExpanded(false);
                  setPostData({
                    content: '',
                    mood: null,
                    triggerWarning: '',
                    tags: '',
                    isAnonymous: false,
                    allowComments: true
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSubmit}
                disabled={!postData?.content?.trim()}
                iconName="Send"
                iconPosition="left"
              >
                Share Post
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;