import { Button, Group, Paper, TextInput, Title, type PaperProps } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function UrlShortenerForm(props: PaperProps) {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <Paper radius="md" p="lg" withBorder {...props}>
        <form onSubmit={form.onSubmit(() => {})}>
            <Title
                order={2}
                size="h1"
                style={{ fontFamily: 'Outfit, var(--mantine-font-family)' }}
                fw={900}
                ta="center"
            >
                📎URL Shortener
            </Title>

            <TextInput
                label="Name"
                placeholder="Enter long link here ..."
                name="name"
                variant="filled"
                {...form.getInputProps('name')}
            />

            <TextInput
                label="Your generated shortened URL"
                placeholder="Subject"
                mt="md"
                name="subject"
                variant="filled"
                {...form.getInputProps('subject')}
            />

            <Group justify="center" mt="xl">
                <Button type="submit" size="md">
                Generate Shortened URL!
                </Button>
            </Group>
        </form>
    </Paper>
  );
}