'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import avatar from '@/assets/images/avatar.jpg';
import { CkContent, Flex, Form, Input } from '@/components';
import { allRoutes } from '@/constants';
import { CommentInputDTO, commentSchema } from '@/features/comment';
import {
  CommentsQuery,
  useArticleQuery,
  useCommentsQuery,
  useCreateCommentMutation,
  useUpdateArticleMutation,
} from '@/generated/graphql';
import { useAuth } from '@/hooks';
import { stringAvatar } from '@/utils';

interface BlogDetailsProps {
  id: string;
}

export function BlogDetails({ id }: BlogDetailsProps) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const router = useRouter();
  const { data, refetch } = useArticleQuery(
    { documentId: id },
    {
      select: (dt) => dt.article,
    },
  );
  const { data: commentData } = useCommentsQuery(
    { documentId: id },
    {
      select: (dt) => dt.comments,
    },
  );

  const { mutate: updateArticle } = useUpdateArticleMutation();
  const { mutate: createComment } = useCreateCommentMutation();

  const methods = useForm({
    resolver: yupResolver(commentSchema),
    defaultValues: {
      input: '',
    },
  });

  const { handleSubmit, register } = methods;

  const onSubmit: SubmitHandler<CommentInputDTO> = (data) => {
    if (user) {
      createComment(
        {
          data: {
            content: data.input,
            user: user.id,
            article: id,
          },
        },
        {
          onSuccess: ({ createComment }) => {
            queryClient.setQueryData<CommentsQuery>(
              useCommentsQuery.getKey({ documentId: id }),
              (oldData) =>
                oldData?.comments
                  ? ({
                      ...oldData,
                      comments: [createComment, ...oldData.comments],
                    } as CommentsQuery)
                  : undefined,
            );
            // queryClient.invalidateQueries({
            //   queryKey: useCommentsQuery.getKey({ documentId: id }),
            // });
            methods.reset();
          },
        },
      );
    } else {
      localStorage.setItem('temp_comment', data.input);
      router.push(allRoutes.login.toURL());
    }
  };

  useEffect(() => {
    // call api 1 more time to get new views
    refetch().then(({ data }) => {
      if (data) {
        updateArticle({
          documentId: data.documentId,
          data: {
            views: data.views + 1,
          },
        });
      }
    });
  }, [updateArticle, refetch]);

  if (!data) {
    return null;
  }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" mb={4}>
        <Stack direction="row" spacing={2} mb={2}>
          {data.categories.map((category) => (
            <Chip
              key={category?.documentId}
              label={category?.name}
              variant="filled"
              color="primary"
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Stack>
        <Typography variant="h4" fontWeight={600}>
          {data.title}
        </Typography>
        <Stack direction="row" alignItems="center" mt={1.5} mb={3}>
          <Stack direction="row" alignItems="center" spacing={1} mr={5}>
            <Avatar alt={avatar.src} src={avatar.src} />
            <Typography variant="body1" color="grey">
              Quang Do
            </Typography>
          </Stack>
          <Typography variant="body1" color="grey" fontWeight={400}>
            {dayjs(data.createdAt).format('MMMM DD, YYYY')}
          </Typography>
        </Stack>
        <CkContent content={data.content || ''} />
      </Flex>
      <Typography variant="h6" mb={1}>
        Comments
      </Typography>
      {commentData && commentData.length > 0 && (
        <List sx={{ bgcolor: 'background.paper', mt: 1, mb: 2 }}>
          {commentData.map((comment, index) => (
            <Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar {...stringAvatar(comment?.user?.username ?? '')} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Flex alignItems="center" justifyContent="space-between">
                      <Typography>{comment?.user?.username}</Typography>
                      <Typography variant="body2" color="grey.500">
                        {dayjs(comment?.createdAt).format('MM/DD/YYYY')}
                      </Typography>
                    </Flex>
                  }
                  secondary={
                    <Typography
                      component="pre"
                      variant="body2"
                      color="grey.600"
                    >
                      {comment?.content}
                    </Typography>
                  }
                />
              </ListItem>
              {index < commentData?.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </Fragment>
          ))}
        </List>
      )}
      <Form
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={1.5}
      >
        <Input
          multiline
          rows={4}
          placeholder="Leave your comments here ..."
          {...register('input')}
        />
        <Button type="submit" variant="contained" sx={{ ml: 'auto' }}>
          Send
        </Button>
      </Form>
    </Flex>
  );
}
